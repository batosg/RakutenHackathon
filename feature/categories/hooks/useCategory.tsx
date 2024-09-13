"use client"
import { useCallback, useEffect, useState } from "react";
import { CategoryGroup } from "@/types/categories";
import useApi from "@/hooks/useApi";

export const useCategory = () => {
    const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([]);

    const { data, error, loading, refetch } = useApi();

    const fetchCategories = useCallback(async () => {
        refetch('/categories', {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': true,
            }
        });
    }, [refetch]);

    useEffect(() => {
        if (data) {
            console.log(data)
            setCategoryGroups(data as CategoryGroup[]);
        }
    }, [data]);

    return { categoryGroups, error, loading, fetchCategories };
}