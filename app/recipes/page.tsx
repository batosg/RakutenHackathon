"use client"
import Image from "next/image";
import { TakikomiImage } from "@/public/"
import Link from "next/link";
import { Button, Header } from "@/components";
import { MadeCount, RecipeProfile, RecipeItem, useRecipeDetail } from "@/feature/recipes";
import { ProfileImage } from "@/public/"
import { useEffect } from "react";

export default function Recipe() {

  const handleDownload = () => {
    console.log("ダウンロード")
  }

  const handleFollow = () => {
    console.log("フォロー")
  }

  const { recipe, isLoading, error, refetchRecipe } = useRecipeDetail({ recipeId: "2138a252-ceb7-4906-8c1d-5bd7f636218e" });

  useEffect(() => {
    refetchRecipe();
    console.log(recipe);
  }, [refetchRecipe]);

  return (
    <>
      <Header />
      <div className="mx-4">
        <div className="text-s mt-10">
          <p>{recipe?.title}</p>
        </div>
        <div className="flex justify-center my-4">
          <Image src={TakikomiImage} width={340} height={300} alt={recipe?.title ?? ""} />
        </div>

        <div className="flex justify-center my-4">
          <Button text="レシピをダウンロードをする" onClick={handleDownload} />
        </div>

        {/*プロフィールパート*/}
        <RecipeProfile name="Rakuten Taro" isFollowed={false} onClick={handleFollow} image={ProfileImage.src} />
        {/*作った数パート*/}
        <MadeCount count={100} />
        {/*材料パート*/}
        <div className="my-7">
          <p className="text-xl ">材料(約Y人分)</p>
          <ul className="my-4 flex flex-col gap-4">
            {recipe?.ingredients?.map((ingredient) => (
              <RecipeItem key={ingredient.ingredient_id} name={ingredient.name ?? ""} amount={ingredient.quantity?.toString() ?? ""} />
            ))}
          </ul>
        </div>
        {/*道具パート*/}
        <div className="my-7">
          <p className="text-xl ">道具</p>
          <ul className="my-4 flex flex-col gap-4">
            {recipe?.tools?.map((tool) => (
              <RecipeItem key={tool.tool_id} name={tool.name ?? ""} amount={tool.category ?? ""} />
            ))}
          </ul>
        </div>
        {/*作り方パート*/}
        <div className="my-7">
          <p className="text-xl ">作り方</p>
          <ol className="my-4 list-decimal list-inside">
            <li className="mb-4">
              人参の皮をピーラーで剥き、包丁で千切りする
            </li>
            <li className="mb-4">
              えのきを手で分け、1. で作成したものとともにボールに入れる
            </li>
            <li className="mb-4">
              米を研ぎ、炊飯器に具材と米、そしてダシを入れ炊く
            </li>
          </ol>
        </div>
        {/*tip パート*/}
        <div className="my-7">
          <p className="text-xl pb-5">tips</p>
          <div className="flex w-full overflow-x-scroll space-x-4 flex-nowrap pb-4">
            <div className="w-[160px] h-[128px] bg-gray-400 text-white flex items-center justify-center flex-shrink-0 text-center">
              ポリ袋でご飯を炊く方法
            </div>
            <div className="w-[160px] h-[128px] bg-gray-400 text-white flex items-center justify-center flex-shrink-0 text-center">
              ピーラーいらずで皮をむく方法
            </div>
            <div className="w-[160px] h-[128px] bg-gray-400 text-white flex items-center justify-center flex-shrink-0 text-center">
              ポリ袋でご飯を研ぐ方法
            </div>
            <div className="w-[160px] h-[128px] bg-gray-400 text-white flex items-center justify-center flex-shrink-0 text-center">
              アイテム4
            </div>
            <div className="w-[160px] h-[128px] bg-gray-400 text-white flex items-center justify-center flex-shrink-0 text-center">
              アイテム5
            </div>
          </div>
        </div>

        {/*キーワードを投稿*/}
        <div className="mx-6">
          <p className="text-m pb-4">キーワードタグ</p>
          <ul className="flex justify-between">
            <li>
              <p className="text-blue-400"> # 地震・津波</p>
            </li>
            <li>
              <p className="text-blue-400"> # 炊き込みご飯</p>
            </li>
            <li>
              <p className="text-blue-400"> # 皮の剥き方</p>
            </li>
          </ul>
        </div>

        {/*レビューパート*/}
        <div className="bg-gray-400 my-4 mx-6  items-center text-center hover:opacity-30 rounded-lg ">
          <Link href="../reviews">レビューを投稿する</Link>
        </div>
      </div>
    </>
  )


}