"use client"
import { useCallback, useEffect, useState } from "react";
import { ToolGroup } from "@/types/tools";
import useApi from "@/hooks/useApi";

export const useTools = () => {
    const [toolGroups, setToolGroups] = useState<ToolGroup[]>([]);

    const { data, error, loading, refetch } = useApi();

    const fetchTools = useCallback(async () => {
        refetch('/tools', {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': true,
            }
        });
    }, [refetch]);

    useEffect(() => {
        if (data) {
            console.log(data);
            setToolGroups(data as ToolGroup[]);
        }
    }, [data]);

    return { toolGroups, error, loading, fetchTools };
}