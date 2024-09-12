"use client";


import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import RecipeCard from "@/feature/recipes/components/RecipeCard";


// デモ用のランダムな日付生成関数
function getRandomDate(startDate?: Date, endDate?: Date): string {
    if(!startDate)startDate = new Date('2020-12-31');
    if(!endDate)endDate = new Date('2024-12-31');
    // 開始日と終了日のタイムスタンプを取得
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();
  
    // 開始日から終了日までのランダムなタイムスタンプを生成
    const randomTimestamp = Math.random() * (endTimestamp - startTimestamp) + startTimestamp;
  
    // タイムスタンプからランダムな日付を生成
    const date = new Date(randomTimestamp)
    return date.toISOString();
}

export default function RecipePage() {
    const [recipeList, setresipeList] = useState([]);
    // データベースからのの取得
    const { data, error, loading, refetch } = useApi();
    useEffect(() => {
        refetch('/recipes', {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': true,
            }
        });
    }, [refetch])
    useEffect(() => {
        handleRecipeList(data);
        console.log(recipeList)
    }, [data])    

    function handleRecipeList(data){
        if(Array.isArray(data))data.forEach((element) => element.saved_at = getRandomDate())
        setresipeList(data)
    }

    function ratingFromReviews(reviews, key){
        if(reviews.length == 0){
            return 0;
        }
        let sum = 0;
        reviews.forEach((review) => {sum+=review[key]})
        return sum/reviews.length
    }
    
    // ソート切り替えボタンを追跡するハンドラ
    const [selected, setSelected] = useState(-1);
    const handleClick = (buttonId) => {
        setSelected(buttonId);
    }
    // ボタンのひな型
    // 一行目
    const buttonTable1 = [
        {id: 0, name: "保存日時順", onClick: ()=>{sortBySavedAt(0)}},
        {id: 1, name: "人気度順", onClick: ()=>{sortByRate(1)}},
        {id: 2, name: "作成時間順", onClick: ()=>{sortByCreationTime(2)}},
    ]
    // 二行目
    const buttonTable2 = [
        {id: 3, name: "おいしさ順", onClick: ()=>{sortByWouldYouEatAgain(3)}},
        {id: 4, name: "保存期間順", onClick: ()=>{sortByLontTeramStorage(4)}},
        {id: 5, name: "材料難易度順", onClick: ()=>{sortByIngredientAcquisition(5)}},
    ]
    // 各種ソート関数
    function sortListByFunction(list: any[], func: { (user: any): any; (user: any): any; (arg0: any): any; }) {
        return list.sort((a, b) => {
            const valueA = func(a);
            const valueB = func(b);
            
            if (valueA < valueB) return -1;
            if (valueA > valueB) return 1;
            return 0;
        });
    }
    function sortBySavedAt(id){
        const newRecipe = sortListByFunction(recipeList, ((recipe)=>-(new Date(recipe.saved_at)).getTime()))
        setresipeList(newRecipe);
        handleClick(id);
    }
    function sortByRate(id){
        const newRecipe = sortListByFunction(recipeList, ((recipe)=>-ratingFromReviews(recipe.reviews, "rating")))
        setresipeList(newRecipe);
        handleClick(id);
    }
    function sortByCreationTime(id){
        const newRecipe = sortListByFunction(recipeList, ((recipe)=>recipe.cooking_time))
        setresipeList(newRecipe);
        handleClick(id);
    }
    function sortByWouldYouEatAgain(id){
        const newRecipe = sortListByFunction(recipeList, ((recipe)=>-ratingFromReviews(recipe.reviews, "would_eat_again")))
        setresipeList(newRecipe);
        handleClick(id);
    }
    function sortByLontTeramStorage(id){
        const newRecipe = sortListByFunction(recipeList, ((recipe)=>-ratingFromReviews(recipe.reviews, "ease_of_long_term_storage")))
        setresipeList(newRecipe);
        handleClick(id);
    }
    function sortByIngredientAcquisition(id){
        const newRecipe = sortListByFunction(recipeList, ((recipe)=>-ratingFromReviews(recipe.reviews, "ease_of_ingredient_acquisition")))
        setresipeList(newRecipe);
        handleClick(id);
    }
    // 選択されているかを受けてボタンのデザインを変化させる関数
    function sortButton(button, selectedId){
        return (<button className={`inline-flex items-center px-4 border text-sm ${button.id === selectedId ? "bg-blue-500 text-white" : 'bg-gray-200 text-gray-700'}`} onClick={button.onClick}>
            {button.name}
        </button>);
    }

    return (
        <div className="m-5">
            <div className="flex w-[90vw] max-w-md mx-auto">
                {buttonTable1.map((button)=>sortButton(button, selected))}
            </div>
            <div className="flex w-[90vw] max-w-md mx-auto">
                {buttonTable2.map((button)=>sortButton(button, selected))}
            </div>

            <ul>
            {loading && <p>Loading...</p>}
        {error && <p>Error loading data.</p>}
        {/* データがロードされていれば表示 */}
        {recipeList && recipeList.length > 0 ? (
            <ul>
                {recipeList.map((recipe, index) => (
                    <li key={index}>
                        <RecipeCard 
                            recipe={recipe} 
                            on_click_card={()=>{}}
                            on_click_right_button={()=>{}}
                            is_local={true}
                            saved_at={recipe.saved_at}
                        />
                    </li>
                ))}
            </ul>
        ) : (
            !loading && <p>No recipes found.</p>  // ロードが終わってもデータが空なら表示
        )}
            </ul>
        </div>
    )
}