"use client";

import Image, { StaticImageData } from "next/image";
import { KatsuCurry, Soba, TacoRice, TakikomiImage} from "@/public/";
import { ProfileImage} from "@/public/";
import { Pasuta} from "@/public";
import { Cookie} from "@/public";
import { useState } from "react";

export default function Recipe() {
    // 本文，見出しを設定できる関数
    const baseText = (text:string) => <div className="mb-4 text-left text-sm">{text}</div>;
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

    // ソート切り替えボタンを追跡するハンドラ
    const [selected, setSelected] = useState(-1);
    const handleClick = (buttonId) => {
        setSelected(buttonId);
    }
    // ボタンのひな型
    const buttonTable = [
        {id: 0, name: "新着順", onClick: ()=>{handleClick(0)}},
        {id: 1, name: "人気度順", onClick: ()=>{handleClick(1)}},
        {id: 2, name: "作成時間順", onClick: ()=>{handleClick(2)}},
    ]
    // 選択されているかを受けてボタンのデザインを変化させる関数
    function sortButton(button, selectedId){
        return (<button className={`flex-1 py-4 border ${button.id === selectedId ? "bg-blue-500 text-white":'bg-gray-200 text-gray-700'}`} onClick={button.onClick}>
            {button.name}
        </button>);
    }

    const recipes = [
        {
            recipe_id: 0,
            title: "炊き込みご飯",
            image: TakikomiImage,
            materials: ["米", "キノコ", "醤油"],
            addedDate: "2024-09-11T10:00:00Z",
            rating: 20,
            creationTime: 40,
        },
        {
        recipe_id: 1,
        title: "和風キノコパスタ",
        image: Pasuta,
        materials: ["乾麺", "キノコ", "醤油", "バター", "塩"],
        addedDate: "2024-09-13T10:00:00Z",
        rating: 30,
        creationTime: 15,
        },
        {
        recipe_id: 2,
        title: "手作りクッキー",
        image: Cookie,
        materials: ["卵", "砂糖", "小麦粉", "バター", "塩"],
        addedDate: "2024-08-10T10:00:00Z",
        rating: 78,
        creationTime: 40,
        },
        {
        recipe_id: 3,
        title: "とろろそば",
        image: Soba,
        materials: ["乾麺", "ねぎ", "山芋", "めんつゆ", "ワサビ"],
        addedDate: "2024-02-10T10:00:00Z",
        rating: 2,
        creationTime: 12,
        },
        {
        recipe_id: 4,
        title: "カツカレー",
        image: KatsuCurry,
        materials: ["レトルトカレー", "米", "ひれ肉", "卵", "片栗粉", "パン粉", "野菜（お好み）"],
        addedDate: "2024-05-10T10:00:00Z",
        rating: 201,
        creationTime: 20,
        },
        {
        recipe_id: 5,
        title: "タコライス",
        image: TacoRice,
        materials: ["米", "カレー粉", "キャベツ", "チーズ", "タバスコ"],
        addedDate: "2023-12-10T10:00:00Z",
        rating: 22,
        creationTime: 10,
        },
    ];

    function recipeCard(map: { recipe_id?: number; title: string; image: StaticImageData; materials: string[]; addedDate?: string; rating?: number; creationTime?: number; }){
        return (<div className="bg-gray-300 w-[90vw] mx-auto rounded-lg m-5 p-5 flex items-start justify-between">
            <div className="w-2/3 text-left">
                {middleHeading(map.title)}
                {baseText(materialsText(map.materials))}
            </div>
                
            <div className="w-1/3">
                <Image className="w-full h-auto rounded-md" src={map.image} alt="ガスコンロ" />
            </div>
        </div>);
    }

    return (
        <div className="m-5">
            <div className="flex w-[90vw] max-w-md mx-auto">
                {buttonTable.map((button)=>sortButton(button, selected))}
            </div>

            <ul>
                {recipes.map((recipe, index) => (
                <li key={index}>
                    {recipeCard(recipe)}
                </li>
                ))}
            </ul>
        </div>
    )


}