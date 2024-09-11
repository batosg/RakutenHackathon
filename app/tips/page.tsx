"use client";

import Image, { StaticImageData } from "next/image";
import { Carrot, CarrotGray, Folk, FolkGray, GassConlo, Heart, KatsuCurry, Refrigerator, RefrigeratorGray, Save, Soba, TacoRice, TakikomiImage} from "@/public/";
import { ProfileImage} from "@/public/";
import { Pasuta} from "@/public";
import { Cookie} from "@/public";
import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";

export default function Recipe() {
    // 本文，見出しを設定できる関数
    const BaseText = ({ text }) => <div className="text-left text-sm mb-2 break-words">{text}</div>; // 折り返し可能に
    const EllipsisText = ({ text }) => (
        <div className="flex-1 min-w-0 text-sm p-2 break-words"> {/* 折り返しを有効に */}
          {text}
        </div>
      );
      const EllipsisTitle = ({ text }) => (
        <div className="flex-1 min-w-0 font-bold text-lg p-2 break-words"> {/* 折り返しを有効に */}
          {text}
        </div>
      );
    

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
    const tipses = [
        {
            recipe_id: 0,
            title: "【ガスが止まった時に】火を使わない調理法／節ガス・節水になるポリ袋調理法",
            image: GassConlo,
            text:"地震や大型台風などの災害によって「ガス」が使えなくなったときにできる調理の工夫と、節ガス・節水になる「ポリ袋調理」について解説します。",
            addedDate: new Date("2024-09-13T10:00:00Z")
        },
        {
            recipe_id: 1,
            title: "【ガスが止まった時に】火を使わない調理法／節ガス・節水になるポリ袋調理法",
            image: GassConlo,
            text:"地震や大型台風などの災害によって「ガス」が使えなくなったときにできる調理の工夫と、節ガス・節水になる「ポリ袋調理」について解説します。",
            addedDate: new Date("2024-12-13T10:00:00Z")
        },
        {
            recipe_id: 2,
            title: "【ガスが止まった時に】火を使わない調理法／節ガス・節水になるポリ袋調理法",
            image: GassConlo,
            text:"地震や大型台風などの災害によって「ガス」が使えなくなったときにできる調理の工夫と、節ガス・節水になる「ポリ袋調理」について解説します。",
            addedDate: new Date("2014-09-13T10:00:00Z")
        },
        {
            recipe_id: 3,
            title: "【ガスが止まった時に】火を使わない調理法／節ガス・節水になるポリ袋調理法",
            image: GassConlo,
            text:"地震や大型台風などの災害によって「ガス」が使えなくなったときにできる調理の工夫と、節ガス・節水になる「ポリ袋調理」について解説します。",
            addedDate: new Date("2025-09-13T10:00:00Z")
        },
        {
            recipe_id: 4,
            title: "【ガスが止まった時に】火を使わない調理法／節ガス・節水になるポリ袋調理法",
            image: GassConlo,
            text:"地震や大型台風などの災害によって「ガス」が使えなくなったときにできる調理の工夫と、節ガス・節水になる「ポリ袋調理」について解説します。",
            addedDate: new Date("2022-01-13T10:00:00Z")
        }
    ];
    const [tipsesList, setTipsesList] = useState([...tipses]);
    // デモデータを受けてカードを作成する関数
    function tipsCard(tipsMap) {
    return (
        <div className="w-full mx-auto my-2 p-4 bg-gray-200 rounded-lg flex flex-col sm:flex-row items-start">
            <div className="flex-1 flex flex-col">
            <EllipsisTitle text={tipsMap.title} />
            <EllipsisText text={tipsMap.text} />
            <BaseText text={`投稿日時 ：${tipsMap.addedDate.toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            })}`} />
            </div>
            <Image
            className="w-full sm:w-1/3 h-auto rounded-md mt-2 sm:mt-0"
            src={tipsMap.image}
            alt="料理画像"
            />
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
        const newRecipe = sortListByFunction(tipsesList, ((recipe)=>-recipe.addedDate.getTime()))
        setTipsesList(newRecipe);
        handleClick(id);
    }
    function sortByRate(id){
        const newRecipe = sortListByFunction(tipsesList, ((recipe)=>-recipe.rating))
        setTipsesList(newRecipe);
        handleClick(id);
    }
    function sortByCreationTime(id){
        const newRecipe = sortListByFunction(tipsesList, ((recipe)=>recipe.creationTime))
        setTipsesList(newRecipe);
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
            <ul>
                {tipsesList.map((recipe, index) => (
                <li key={index}>
                    {tipsCard(recipe)}
                </li>
                ))}
            </ul>
        </div>
    )


}