"use client";

import { useEffect } from "react";
import RecipeCard from "@/feature/recipes/components/RecipeCard";
import { useSearch } from "@/feature/recipes/hooks/useSearch";
import { useSearchContext } from '@/feature/recipes';
import { Header } from "@/components";

export default function RecipeSearchPage() {

    const { searchQuery } = useSearchContext();
    const { recipes, loading, error, search } = useSearch();

    useEffect(() => {
        if (searchQuery) {
            search();
        }
    }, [searchQuery, search]);

    return (
        <div>
            <Header />
            <ul className="mt-4">
                {loading && <p>Loading...</p>}
                {error && <p>Error loading data: {error.message}</p>}
                {recipes && recipes.length > 0 ? (
                    recipes.map((recipe, index) => (
                        <li key={index} className="mb-4">
                            <RecipeCard
                                recipe={recipe}
                                on_click_card={() => { }}
                                on_click_right_icon={() => { }}
                                is_local={false}
                            />
                        </li>
                    ))
                ) : (
                    !loading && <p>No recipes found.</p>
                )}
            </ul>
        </div>
    )
}