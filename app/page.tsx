"use client";

import { CategoryCollapse, Pickup, ToolTag } from "@/feature/recipes";
import { KatsuCurry } from "@/public";
import { categories, labels } from '@/constants/recipe';
import { Header, Searchbar } from '@/components';
import { TipsItem } from "@/feature/tips";
import { tipsContent } from "@/constants/tips";

export default function Home() {

  return (
    <div>
      <Header />
      <Pickup image={KatsuCurry.src} title="カツカレー" />


      {/*カテゴリパート*/}
      <div className="mx-4">
        <h2 className="text-lg font-bold mb-4 mt-10">定番レシピカテゴリ</h2>
        {categories.map((categoryGroup, index) => (
          <CategoryCollapse key={categoryGroup.category_group} categoryGroup={categoryGroup.category_group} category={categoryGroup.category} isInitialOpen={index === 0} />
        ))}
      </div>

      {/*お手持ちの調理器具から検索パート*/}
      <div className="w-full px-6">
        <h2 className="w-full text-lg mt-7 mb-3 font-bold">お手持ちの調理器具から検索</h2>
        <div className="w-full">
          <Searchbar />
        </div>
      </div>

      {/*調理器具の選択ボタンパート*/}
      <div className="flex flex-wrap gap-2 p-2 mx-4 mt-4">
        {labels.map((label, index) => (
          <ToolTag key={index} label={label} index={index} />
        ))}
      </div>

      {/*災害時のお役立ち情報 パート*/}
      <div className="mx-6 my-7">
        <p className="text-xl pb-5 font-bold">災害時のお役立ち情報</p>
        <div className="flex w-full overflow-x-scroll flex-nowrap pb-4 gap-4">
          {tipsContent.map((tip, index) => (
            <TipsItem key={index} title={tip.title} content={tip.content[0].content as string} image={tip.image} postDate={tip.postDate} />
          ))}
        </div>
      </div>
    </div>
  );
}
