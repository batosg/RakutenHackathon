"use client";

import Image, { StaticImageData } from "next/image";
import { Carrot, CarrotGray, Delete, Folk, FolkGray, Heart, KatsuCurry, Refrigerator, RefrigeratorGray, Save, Soba, TacoRice, TakikomiImage} from "@/public/";
import { ProfileImage} from "@/public/";
import { Pasuta} from "@/public";
import { Cookie} from "@/public";
import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";

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
    // アイコン画像を作成する関数
    const iconImage = (src: StaticImageData, text: string, width: number = 20, height: number = 20) => (
        <Image
            src={src}
            alt={text}
            width={width}
            height={height}
            className="object-contain"  // 画像の縦横比を維持しつつ、指定サイズ内に収める
        />
    );

    // レシピを表すカードの描写に関する部分
    // デモデータ

    const { data, error, loading, refetch } = useApi();
    useEffect(() => {
        refetch('/recipes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        console.log("test");
    }, [refetch])
    useEffect(() => {
        console.log(data);
    }, [data])
    
    const recipes = [
        {
            recipe_id: 0,
            title: "炊き込みご飯",
            image: TakikomiImage,
            materials: ["米", "キノコ", "醤油"],
            addedDate: new Date("2024-09-11T10:00:00Z"),
            savedDate: new Date("2025-09-11T10:00:00Z"),
            rating: 20,
            creationTime: 40,
            obtainMaterials: 3,
            life: 2,
            taste: 4
        },
        {
        recipe_id: 1,
        title: "和風キノコパスタ",
        image: Pasuta,
        materials: ["乾麺", "キノコ", "醤油", "バター", "塩"],
        addedDate: new Date("2024-09-13T10:00:00Z"),
        savedDate: new Date("2026-09-11T10:00:00Z"),
        rating: 30,
        creationTime: 15,
        obtainMaterials: 2,
        life: 5,
        taste: 1
        },
        {
        recipe_id: 2,
        title: "手作りクッキー",
        image: Cookie,
        materials: ["卵", "砂糖", "小麦粉", "バター", "塩"],
        addedDate: new Date("2024-08-10T10:00:00Z"),
        savedDate: new Date("2027-09-11T10:00:00Z"),
        rating: 78,
        creationTime: 40,
        obtainMaterials: 2,
        life: 1,
        taste: 3
        },
        {
        recipe_id: 3,
        title: "とろろそば",
        image: Soba,
        materials: ["乾麺", "ねぎ", "山芋", "めんつゆ", "ワサビ"],
        addedDate: new Date("2024-02-10T10:00:00Z"),
        savedDate: new Date("2028-09-11T10:00:00Z"),
        rating: 2,
        creationTime: 12,
        obtainMaterials: 4,
        life: 4,
        taste: 1
        },
        {
        recipe_id: 4,
        title: "カツカレー",
        image: KatsuCurry,
        materials: ["レトルトカレー", "米", "ひれ肉", "卵", "片栗粉", "パン粉", "野菜（お好み）"],
        addedDate: new Date("2024-05-10T10:00:00Z"),
        savedDate: new Date("2025-11-11T10:00:00Z"),
        rating: 201,
        creationTime: 20,
        obtainMaterials: 5,
        life: 2,
        taste: 3
        },
        {
        recipe_id: 5,
        title: "タコライス",
        image: TacoRice,
        materials: ["米", "カレー粉", "キャベツ", "チーズ", "タバスコ"],
        addedDate: new Date("2023-12-10T10:00:00Z"),
        savedDate: new Date("2025-02-11T10:00:00Z"),
        rating: 22,
        creationTime: 10,
        obtainMaterials: 3,
        life: 4,
        taste: 1

        },
    ];
    const [recipeList, setresipeList] = useState([...recipes]);
    const handleRecipes = (recipes) => {
        setSelected(recipes);
    }
    // 評価値を表すアイコンのmap
    const iconMap = [
        {key: "obtainMaterials", colorIcon: Carrot, grayIcon: CarrotGray, text:"素材の調達は簡単でしたか"},
        {key: "life", colorIcon: Refrigerator, grayIcon: RefrigeratorGray, text:"長期保存はしやすいと感じますか"},
        {key: "taste", colorIcon: Folk, grayIcon: FolkGray, text: "もう一度食べたいと思いますか"},
    ];
    function rateIcons(rate: number, ColordIcon: StaticImageData, GrayIcon: StaticImageData, text: string) {
        // 評価の最大値の5まで繰り返す
        const iconList = Array.from({ length: 5 }, (_, i) => i < rate ? ColordIcon : GrayIcon);
    
        return (
            <div className="mt-1 mb-1">
                <ul className="flex list-none p-0 m-0">
                    {iconList.map((item, index) => (
                        <li key={index} className="mr-1">
                            {iconImage(item, text)}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
    // デモデータを受けてカードを作成する関数
    function recipeCard(recipeMap: {
        [x: string]: any;
        recipe_id?: number;
        title: string;
        image: StaticImageData;
        materials: string[];
        addedDate: Date;
        rating?: number;
        creationTime?: number;
    }) {
        return (
            <div className="w-[90vw] mx-auto my-5 flex">
                <div className="flex-1 bg-gray-300 rounded-lg p-5 flex">
                    <div className="w-2/3 text-left pr-4">
                        {middleHeading(recipeMap.title)}
                        {baseText(`材料 ：${materialsText(recipeMap.materials)}`)}
                        {baseText(`作成時間 ：${recipeMap.creationTime}分`)}
                        <ul className="list-none p-0">
                            {iconMap.map((iconMap, index) => (
                                <li key={index} className="inline-block mr-2">
                                    {rateIcons(recipeMap[iconMap.key], iconMap.colorIcon, iconMap.grayIcon, iconMap.text)}
                                </li>
                            ))}
                        </ul>
                        {baseText(`投稿日時 ：${recipeMap.addedDate.toLocaleDateString('ja-JP', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        })}`)}
                        {baseText(`保存日時 ：${recipeMap.savedDate.toLocaleDateString('ja-JP', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        })}`)}
                    </div>
    
                    <div className="w-1/3 flex flex-col justify-between">
                    <div className="flex flex-col items-center">
                        <Image className="w-full h-auto rounded-md" src={recipeMap.image} alt="料理画像" />
                    </div>
                    <div className="flex items-center mt-3">
                        {iconImage(Heart, "ハートのアイコン")}
                        <span className="text-lg font-semibold ml-2">{recipeMap.rating}</span>
                    </div>
                </div>
            </div>
    
                <div className="min-w-[30px] flex flex-col items-center justify-start px-3">
                    <div className="flex-none">
                        {iconImage(Delete, "保存")}
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
    const buttonTable = [
        {id: 0, name: "新着順", onClick: ()=>{sortByAddedDate(0)}},
        {id: 1, name: "人気度順", onClick: ()=>{sortByRate(1)}},
        {id: 2, name: "作成時間順", onClick: ()=>{sortByCreationTime(2)}},
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
        const newRecipe = sortListByFunction(recipeList, ((recipe)=>-recipe.addedDate.getTime()))
        setresipeList(newRecipe);
        handleClick(id);
    }
    function sortByRate(id){
        const newRecipe = sortListByFunction(recipeList, ((recipe)=>-recipe.rating))
        setresipeList(newRecipe);
        handleClick(id);
    }
    function sortByCreationTime(id){
        const newRecipe = sortListByFunction(recipeList, ((recipe)=>recipe.creationTime))
        setresipeList(newRecipe);
        handleClick(id);
    }
    // 選択されているかを受けてボタンのデザインを変化させる関数
    function sortButton(button, selectedId){
        return (<button className={`inline-flex items-center px-4 border ${button.id === selectedId ? "bg-blue-500 text-white" : 'bg-gray-200 text-gray-700'}`} onClick={button.onClick}>
            {button.name}
        </button>);
    }
    return (
        <div className="m-5">
            <div className="flex w-[80vw] max-w-md mx-auto">
                {buttonTable.map((button)=>sortButton(button, selected))}
            </div>

            <ul>
                {recipeList.map((recipe, index) => (
                <li key={index}>
                    {recipeCard(recipe)}
                </li>
                ))}
            </ul>
        </div>
    )
}