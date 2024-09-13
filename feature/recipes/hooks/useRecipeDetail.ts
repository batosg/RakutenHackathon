"use client"
import useApi from "@/hooks/useApi";
import { useCallback, useEffect, useState } from "react";

export interface Recipe {
    categories: Category[];
    cooking_time: number;
    cost: number;
    created_at: string;
    description: string;
    difficulty: string;
    image_url: string;
    ingredients: Ingredient[];
    recipe_id: string;
    reviews: Review[];
    servings: number;
    title: string;
    tools: Tool[];
    updated_at: string;
}

export interface Category {
    category_group?: null;
    category_id?: string;
    category_image?: null;
    category_name?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Ingredient {
    ingredient_id?: string;
    name?: string;
    quantity?: number;
}

export interface Review {
    comment: string;
    created_at: string;
    ease_of_ingredient_acquisition: number;
    ease_of_long_term_storage: number;
    rating: number;
    recipe: null;
    recipe_id: string;
    review_id: string;
    updated_at: string;
    user: User;
    user_id: string;
    would_eat_again: number;
}

export interface User {
    created_at: string;
    email: string;
    name: string;
    rakuten_id: string;
    updated_at: string;
    user_id: string;
}

export interface Tool {
    category?: string;
    description?: string;
    name?: string;
    tool_id?: string;
}

interface UseRecipeDetailProps {
    recipeId: string;
}

interface UseRecipeDetailReturn {
    recipe: Recipe | null;
    isLoading: boolean;
    error: Error | null;
    refetchRecipe: () => void;
}

export const useRecipeDetail = (recipeId: string): UseRecipeDetailReturn => {
    const { data, error, loading, refetch } = useApi();
    const [recipe, setRecipe] = useState<Recipe | null>(null);

    const fetchRecipeDetail = useCallback(() => {
        refetch(`/recipes/${recipeId}`, {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': true,
            }
        });
    }, [refetch, recipeId]);

    useEffect(() => {
        fetchRecipeDetail();
    }, [fetchRecipeDetail]);

    useEffect(() => {
        if (data) {
            setRecipe(data as Recipe);
        }
    }, [data]);

    const refetchRecipe = useCallback(() => {
        fetchRecipeDetail();
    }, [fetchRecipeDetail]);

    return {
        recipe,
        isLoading: loading,
        error: error ? new Error(error.message) : null,
        refetchRecipe
    };
};