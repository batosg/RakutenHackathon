"use client"
import useApi from "@/hooks/useApi";
import { useCallback, useEffect, useState } from "react";

export interface Response {
    cooking_time: number;
    cost: number;
    created_at: string;
    description: string;
    difficulty: string;
    ingredients: Ingredient[];
    recipe_id: string;
    reviews: Review[];
    servings: number;
    title: string;
    tools: Tool[];
    updated_at: string;
}

export interface Ingredient {
    ingredient_id?: string;
    name?: string;
    quantity?: number;
}

export interface Review {
    comment: null | string;
    created_at: string;
    rating: number;
    recipe_id: string;
    review_id: string;
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
    recipe: Response | null;
    isLoading: boolean;
    error: Error | null;
    refetchRecipe: () => void;
}

export const useRecipeDetail = ({ recipeId }: UseRecipeDetailProps): UseRecipeDetailReturn => {
    const { data, error, loading, refetch } = useApi();
    const [recipe, setRecipe] = useState<Response | null>(null);

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
            setRecipe(data as Response);
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