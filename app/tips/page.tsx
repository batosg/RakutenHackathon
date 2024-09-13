"use client";

import { useState } from "react";
import { tipsContent } from "@/constants/tips";
import { TipsContent } from "@/types/tips";
import { Header } from "@/components";
import { TipsItem } from "@/feature/tips";

export default function Recipe() {

    const [tipsesList, setTipsesList] = useState<TipsContent[]>(tipsContent);

    const buttonTable = [
        { id: 0, name: "新着順", onClick: () => { sortByAddedDate() } },
        { id: 1, name: "人気度順", onClick: () => { sortByRate() } },
        { id: 2, name: "作成時間順", onClick: () => { sortByCreationTime() } },
    ]

    const sortListByFunction = (list: any[], func: { (arg0: any): any; (arg0: any): any; (arg0: any): any; }) => {
        return list.sort((a, b) => {
            const valueA = func(a);
            const valueB = func(b);

            if (valueA < valueB) return -1;
            if (valueA > valueB) return 1;
            return 0;
        });
    }

    function sortByAddedDate() {
        const newTips = sortListByFunction(tipsesList, ((tips: TipsContent) => -tips.postDate.getTime()))
        setTipsesList(newTips);
    }
    function sortByRate() {
        const newTips = sortListByFunction(tipsesList, ((tips: TipsContent) => -tips.rating))
        setTipsesList(newTips);
    }
    function sortByCreationTime() {
        const newTips = sortListByFunction(tipsesList, ((tips: TipsContent) => tips.editDate.getTime()))
        setTipsesList(newTips);
    }

    const [selectedButton, setSelectedButton] = useState<number>(0);

    return (
        <>
            <Header />
            <div className="p-4">
                <h3 className="text-lg font-bold mb-4">災害時のお役立ち情報: {tipsesList.length}件</h3>
                <div className="flex justify-between gap-2 mb-4">
                    {buttonTable.map((button, index) => (
                        <button key={index} onClick={() => { button.onClick(); setSelectedButton(button.id) }} className="text-white px-4 py-2 rounded-md w-full bg-accent"
                            style={{ opacity: selectedButton === button.id ? 1 : 0.5 }}>{button.name}</button>
                    ))}
                </div>
                <ul className="flex flex-wrap gap-2 p-2 mx-4 mt-4">
                    {tipsesList.map((tips, index) => (
                        <li key={index}>
                            <TipsItem title={tips.title} content={tips.content[0].content as string} image={tips.image} postDate={tips.postDate} articleId={tips.articleId} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}