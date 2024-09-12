import useApi from "@/hooks/useApi";
import { Recipe } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { useSearchContext } from '../contexts/SearchContext';

export const useSearch = () => {
    const { searchQuery } = useSearchContext();
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [tools, setTools] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const { data, error, loading, refetch } = useApi()

    const search = useCallback(() => {
        console.log(`query: ${searchQuery}`)
        if (searchQuery) {
            let searchUrl = `/recipes/search?query=${searchQuery}`;

            ingredients.forEach(ingredient => {
                searchUrl += `&ingredients=${encodeURIComponent(ingredient)}`;
            });
            tools.forEach(tool => {
                searchUrl += `&tools=${encodeURIComponent(tool)}`;
            });
            categories.forEach(category => {
                searchUrl += `&categories=${encodeURIComponent(category)}`;
            });

            refetch(searchUrl, {
                method: 'GET',
                headers: {
                    'ngrok-skip-browser-warning': true,
                }
            });
        }
    }, [searchQuery, ingredients, tools, categories, refetch]);

    useEffect(() => {
        if (data) {
            console.log(data);
            setRecipes(data);
        }
    }, [data]);

    return { search, setIngredients, setTools, setCategories, recipes, error, loading };
};