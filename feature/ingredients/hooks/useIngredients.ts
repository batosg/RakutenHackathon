"use client"
import { useCallback, useEffect, useState } from "react";
import { IngredientGroup } from "@/types/ingredients";
import useApi from "@/hooks/useApi";

export const useIngredients = () => {
    const [ingredientGroups, setIngredientGroups] = useState<IngredientGroup[]>([]);

    const { data, error, loading, refetch } = useApi();

    const fetchIngredients = useCallback(async () => {
        refetch('/ingredients', {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': true,
            }
        });
    }, [refetch]);

    useEffect(() => {
        if (data) {
            console.log(data);
            setIngredientGroups(data as IngredientGroup[]);
        }
    }, [data]);

    return { ingredientGroups, error, loading, fetchIngredients };
};
