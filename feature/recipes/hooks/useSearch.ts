import useApi from "@/hooks/useApi";
import { Recipe } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { useSearchContext } from '../contexts/SearchContext';

export const useSearch = () => {
    const { searchQuery, ingredients, tools, categories } = useSearchContext();
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const { data, error, loading, refetch } = useApi()

    const search = useCallback(() => {
        if (searchQuery || ingredients.length > 0 || tools.length > 0 || categories.length > 0) {
            let searchUrl = '/recipes/search?';
            const params = new URLSearchParams();

            if (searchQuery) params.append('query', searchQuery);
            ingredients.forEach(ingredient => params.append('ingredients', ingredient));
            tools.forEach(tool => params.append('tools', tool));
            categories.forEach(category => params.append('categories', category));

            searchUrl += params.toString();

            console.log(searchUrl);

            refetch(searchUrl, {
                method: 'GET',
                headers: {
                    'ngrok-skip-browser-warning': true,
                }
            });
        }
    }, [searchQuery, ingredients, tools, categories, refetch]);

    useEffect(() => {
        search();
    }, [search]);

    useEffect(() => {
        if (data) {
            console.log(data);
            setRecipes(data);
        }
    }, [data]);

    return { search, recipes, error, loading };
};