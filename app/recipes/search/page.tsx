"use client";

import Image, { StaticImageData } from "next/image";
import { Carrot, CarrotGray, Folk, FolkGray, Heart, KatsuCurry, Refrigerator, RefrigeratorGray, Save, Soba, TacoRice, TakikomiImage} from "@/public/";
import { ProfileImage} from "@/public/";
import { Pasuta} from "@/public";
import { Cookie} from "@/public";
import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import StarRating from "@/app/reviews/StarRating";
import IconImage from "../../../feature/recipes/components/IconImage";

export default function Recipe() {
    // 本文，見出しを設定できる関数
    const baseText = (text:string) => <div className="mb-4s text-left text-sm">{text}</div>;
    const middleHeading = (text:string) => <div className="mb-4s text-left text-sm font-bold">{text}</div>;
    // 材料の省略表記を出力する関数

    function materialsText(materials: string[]){
        // 表示する材料の最大個数，これを上回るものは"…"で省略される
        const maxMaterials = 3;
        if(materials.length <= maxMaterials){
            return materials.join(", ")
        }else{
            return materials.slice(0,maxMaterials).join(", ") + " …"
        }
    }


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
        setresipeList(data);
        console.log(data)
    }, [data])    

    function ratingFromReviews(reviews, key){
        if(reviews.length == 0){
            return 0;
        }
        let sum = 0;
        reviews.forEach((review) => {sum+=review[key]})
        return sum/reviews.length
    }
    // デモデータを受けてカードを作成する関数
    // function recipeCard(recipeMap: { [x: string]: number; recipe_id?: number; title: any; image: any; materials: any; addedDate: any; rating: any; creationTime: any; obtainMaterials?: number; life?: number; taste?: number; 
    function recipeCard(recipeMap, ){
        return (
            <div className="w-[90vw] mx-auto my-5 flex">
                <div className="bg-gray-300 rounded-lg p-5 flex-1">
                    <div className="flex-1 flex">
                        <div className="w-2/3 text-left pr-4">
                            {middleHeading(recipeMap.title)}
                            {baseText(`材料 ：${materialsText(recipeMap.ingredients.map((element)=>element.name))}`)}
                            {baseText(`作成時間 ：${recipeMap.cooking_time}分`)}
                            {baseText(`投稿日時 ：${(new Date(recipeMap.created_at)).toLocaleDateString('ja-JP', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                            })}`)}
                        </div>
                        <div className="w-1/3 flex flex-col justify-between">
                            <div className="relative aspect-square">
                                {/* <Image className="w-full h-auto rounded-md" src={recipeMap.image} alt="料理画像" /> */}
                                <Image className="object-contain" fill src={recipeMap.image_url} alt="料理画像" />
                                </div>
                        </div>
                    </div>
                    <div className="items-center mt-3 flex justify-around">
                            <div className="flex items-center">
                                <IconImage src={Folk} text={"おいしさ"} />
                                <span className="text-xl font-semibold ml-1 mr-3 mb-1 " style={{ verticalAlign: 'middle' }}>{ratingFromReviews(recipeMap.reviews, "would_eat_again")}</span>
                            </div>
                            <div className="flex items-center">
                                <IconImage src={Refrigerator} text={"保存期間"} />
                                <span className="text-xl font-semibold ml-1 mr-3 mb-1 " style={{ verticalAlign: 'middle' }}>{ratingFromReviews(recipeMap.reviews, "ease_of_long_term_storage")}</span>
                            </div>
                            <div className="flex items-center">
                                <IconImage src={Carrot} text={"材料取得難易度"} />
                                <span className="text-xl font-semibold ml-1 mr-3 mb-1 " style={{ verticalAlign: 'middle' }}>{ratingFromReviews(recipeMap.reviews, "ease_of_ingredient_acquisition")}</span>
                            </div>
                            <div className="flex items-center">
                                <StarRating rating={1} maxStars={1} />
                                <span className="text-xl font-semibold ml-1 mr-3 mb-1 " style={{ verticalAlign: 'middle' }}>{ratingFromReviews(recipeMap.reviews, "rating")}</span>
                            </div>
                        </div>  
                </div>
    
                <div className="min-w-[30px] flex flex-col items-center justify-start px-3">
                    <div className="flex-none">
                        <IconImage src={Save} text={"保存"} />
                    </div>
                </div>
            </div>
        );
    }

    
    // ソート切り替えボタンを追跡するハンドラ
    const [selected, setSelected] = useState(-1);
    const handleClick = (buttonId) => {
        setSelected(buttonId);
    }
    // ボタンのひな型
    // 一行目
    const buttonTable1 = [
        {id: 0, name: "新着順", onClick: ()=>{sortByAddedDate(0)}},
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
    function sortByAddedDate(id){
        const newRecipe = sortListByFunction(recipeList, ((recipe)=>-(new Date(recipe.created_at)).getTime()))
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
                        {recipeCard(recipe)}
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