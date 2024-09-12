"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import RecipeCard from "@/feature/recipes/components/RecipeCard";
import { Header } from "@/components";
import { useSearch } from "@/feature/recipes/hooks/useSearch";
import { useSearchContext } from '@/feature/recipes/contexts/SearchContext';

export default function RecipeSearchPage() {
    const searchParams = useSearchParams();
    const { searchQuery, setSearchQuery } = useSearchContext();
    const { recipes, loading, error, search } = useSearch();

    useEffect(() => {
        const query = searchParams.get('query');
        if (query) {
            setSearchQuery(query);
            search();
        }
    }, [searchParams, setSearchQuery, search]);

    return (
        <div>
            <Header />
            <div className="m-5">
                <h1 className="text-2xl font-bold mb-4">検索結果: {searchQuery}</h1>
                {loading && <p>Loading...</p>}
                {error && <p>Error loading data: {error.message}</p>}
                {recipes && recipes.length > 0 ? (
                    <ul className="space-y-4">
                        {recipes.map((recipe) => (
                            <li key={recipe.recipe_id}>
                                <RecipeCard
                                    recipe={recipe}
                                    on_click_card={() => { }}
                                    on_click_right_icon={() => { }}
                                    is_local={false}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    !loading && <p>No recipes found.</p>
                )}
            </div>
        </div>
    );
}
