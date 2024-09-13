"use client";

import { CategoryCollapse, Pickup, ToolTag, useCategory, useRecipeDetail, useSearchContext } from "@/feature/recipes";
import { KatsuCurry } from "@/public";
import { categories, labels } from '@/constants/recipe';
import { Header, Searchbar } from '@/components';
import { TipsItem } from "@/feature/tips";
import { tipsContent } from "@/constants/tips";
import { useEffect } from "react";
import { useTools } from "@/feature/tools";
import { ToolGroup } from "@/types/tools";

export default function Home() {

  const { categoryGroups, error: categoryError, loading: categoryLoading, fetchCategories } = useCategory();
  const { toolGroups, error: toolError, loading: toolLoading, fetchTools } = useTools();

  const { tools: selectedTools, setTools: setSelectedTools } = useSearchContext();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchTools();
  }, [fetchTools]);

  const tools = (toolResponse: ToolGroup[]) => {
    const tools: string[] = [];
    toolResponse.forEach((toolGroup) => {
      toolGroup.tools.forEach((tool) => {
        tools.push(tool.name);
      });
    });
    return tools;
  }

  const handleToolClick = (label: string) => {
    if (selectedTools.includes(label)) {
      setSelectedTools(selectedTools.filter((tool) => tool !== label));
    } else {
      setSelectedTools([...selectedTools, label]);
    }
  }

  return (
    <div>
      <Header />
      <Pickup />
      {/*カテゴリパート*/}
      <div className="mx-4">
        <h2 className="text-lg font-bold mb-4 mt-10">定番レシピカテゴリ</h2>
        {categoryGroups.map((categoryGroup, index) => (
          <CategoryCollapse key={categoryGroup.group_name} categoryGroup={categoryGroup.group_name} category={categoryGroup.categories} isInitiallyOpen={index === 0} />
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
        {tools(toolGroups).map((label, index) => (
          <ToolTag key={index} label={label} index={index} onClick={handleToolClick} isSelected={selectedTools.includes(label)} />
        ))}
      </div>

      {/*災害時のお役立ち情報 パート*/}
      <div className="mx-6 my-7">
        <p className="text-xl pb-5 font-bold">災害時のお役立ち情報</p>
        <div className="flex w-full overflow-x-scroll flex-nowrap pb-4 gap-4">
          {tipsContent.map((tip, index) => (
            <TipsItem key={index} title={tip.title} content={tip.content[0].content as string} image={tip.image} postDate={tip.postDate} articleId={tip.articleId} />
          ))}
        </div>
      </div>
    </div>
  );
}
