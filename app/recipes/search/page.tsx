"use client";

import RecipeCard from "@/feature/recipes/components/RecipeCard";
import { Header } from "@/components";
import { useSearch } from "@/feature/recipes/hooks/useSearch";
import { useSearchContext } from '@/feature/recipes/contexts/SearchContext';
import { PulseLoader } from "react-spinners";
import { FaSearch } from 'react-icons/fa';

export default function RecipeSearchPage() {
    const { searchQuery } = useSearchContext();
    const { recipes, loading, error } = useSearch();

    return (
        <div className="h-screen">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h1 className="text-3xl font-bold mb-2 text-gray-800 flex items-center">
                        <FaSearch className="mr-3 text-accent" />
                        検索結果: <span className="text-accent ml-2">{searchQuery}</span>
                    </h1>
                    <div className="w-20 h-1 bg-accent rounded-full mb-4"></div>
                </div>

                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <PulseLoader color="#10B981" />
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                        <p className="font-bold">エラー</p>
                        <p>{error.message}</p>
                    </div>
                )}

                {recipes && recipes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recipes.map((recipe) => (
                            <div key={recipe.recipe_id} className="transform hover:scale-105 transition-transform duration-300">
                                <RecipeCard
                                    recipe={recipe}
                                    on_click_card={() => { }}
                                    on_click_right_icon={() => { }}
                                    is_local={false}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    !loading && (
                        <div className="text-center py-12">
                            <p className="text-xl text-gray-600">レシピが見つかりませんでした。</p>
                            <p className="text-gray-500 mt-2">別のキーワードで検索してみてください。</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
