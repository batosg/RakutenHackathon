"use client"
import React, { useEffect } from 'react'
import Image from 'next/image';
import { useRecipeDetail } from '..';
import { BounceLoader } from "react-spinners";

const Pickup = () => {

    const { recipe, isLoading, error, refetchRecipe } = useRecipeDetail("2138a252-ceb7-4906-8c1d-5bd7f636218e");

    useEffect(() => {
        refetchRecipe();
    }, [refetchRecipe]);

    const gradientStyle = {
        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)',
    };

    return (
        <div className="rounded-xl">
            <h2 className="ml-4 text-lg font-bold mb-4">今日のPick upレシピ</h2>
            <div className="w-full h-full aspect-square relative">
                {isLoading ?
                    <div className="flex justify-center items-center aspect-square">
                        <BounceLoader color="red" />
                    </div> : (
                        <Image
                            src={recipe?.image_url ?? ""}
                            alt={recipe?.title ?? ""}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-xl"
                        />
                    )}
                <div
                    className="absolute bottom-0 p-4 w-full flex items-end justify-end"
                    style={gradientStyle}
                >
                    <h3 className="text-xl font-bold line-clamp-2 text-white box-border py-4">{recipe?.title ?? ""}</h3>
                </div>
            </div>
        </div>
    )
}

export default Pickup