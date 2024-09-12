import React from "react";
import Image from "next/image";
import IconImage from "./IconImage";
import StarRating from "@/app/reviews/StarRating";
import { Recipe, Review } from "@/types/Recipes";
import { Carrot, Delete, Folk, Refrigerator, Save } from "@/public";

interface RecipeCardProps{
    recipe: Recipe;
    is_local: boolean;
    on_click_card: () => void;
    on_click_right_icon: () => void;
    saved_at?: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
    recipe,
    is_local,
    on_click_card,
    on_click_right_icon,
    saved_at,
}) => {
    const middleHeading = (text: string) => (
        <div className="mb-4s text-left text-sm font-bold">{text}</div>
    );

    const baseText = (text: string) => (
        <div className="mb-4s text-left text-sm">{text}</div>
    );

    const materialsText = (materials: string[]) => {
        const maxMaterials = 3;
        if (materials.length <= maxMaterials) {
            return materials.join(", ");
        } else {
            return materials.slice(0, maxMaterials).join(", ") + " …";
        }
    };

    const ratingFromReviews = (reviews: Review[], key: keyof Review) => {
        if (reviews.length === 0) {
            return 0;
        }
        const sum = reviews.reduce((acc, review) => acc + (review[key] || 0), 0);
        return sum / reviews.length;
    };

    console.log(`${is_local}, ${saved_at}, ${is_local&&saved_at}`)
    return (
      <div className="w-[90vw] mx-auto my-5 flex">
        <div className="bg-gray-300 rounded-lg p-5 flex-1" onClick={on_click_card}>
          <div className="flex-1 flex">
            <div className="w-2/3 text-left pr-4">
              {middleHeading(recipe.title)}
              {baseText(
                `材料 ：${materialsText(recipe.ingredients.map((element) => element.name))}`
              )}
              {baseText(`作成時間 ：${recipe.cooking_time}分`)}
              {baseText(
                `投稿日時 ：${new Date(recipe.created_at).toLocaleDateString(
                  "ja-JP",
                  {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }
                )}`
              )}
              {is_local && saved_at? baseText(
                `保存日時 ：${new Date(saved_at).toLocaleDateString(
                  "ja-JP",
                  {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }
                )}`
              ):<div></div>}
            </div>
            <div className="w-1/3 flex flex-col justify-between">
              <div className="relative aspect-square">
                <Image
                  className="object-contain"
                  fill
                  src={recipe.image_url}
                  alt="料理画像"
                />
              </div>
            </div>
          </div>
          <div className="items-center mt-3 flex justify-around">
            <div className="flex items-center">
              <IconImage src={Folk} text={"おいしさ"} />
              <span
                className="text-xl font-semibold ml-1 mr-3 mb-1 "
                style={{ verticalAlign: "middle" }}
              >
                {ratingFromReviews(recipe.reviews, "would_eat_again")}
              </span>
            </div>
            <div className="flex items-center">
              <IconImage src={Refrigerator} text={"保存期間"} />
              <span
                className="text-xl font-semibold ml-1 mr-3 mb-1 "
                style={{ verticalAlign: "middle" }}
              >
                {ratingFromReviews(recipe.reviews, "ease_of_long_term_storage")}
              </span>
            </div>
            <div className="flex items-center">
              <IconImage src={Carrot} text={"材料取得難易度"} />
              <span
                className="text-xl font-semibold ml-1 mr-3 mb-1 "
                style={{ verticalAlign: "middle" }}
              >
                {ratingFromReviews(recipe.reviews, "ease_of_ingredient_acquisition")}
              </span>
            </div>
            <div className="flex items-center">
              <StarRating rating={1} maxStars={1} />
              <span
                className="text-xl font-semibold ml-1 mr-3 mb-1 "
                style={{ verticalAlign: "middle" }}
              >
                {ratingFromReviews(recipe.reviews, "rating")}
              </span>
            </div>
          </div>
        </div>
  
        <div
        className="min-w-[30px] flex flex-col items-center justify-start px-3"
        onClick={on_click_right_icon}
        >
            <div className="flex-none">
                <IconImage src={!is_local ? Save : Delete} text={!is_local ? "保存" : "クラウド"} />
            </div>
        </div>
      </div>
    );
};

export default RecipeCard;