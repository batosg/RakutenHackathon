'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';

interface SearchContextType {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    ingredients: string[];
    setIngredients: React.Dispatch<React.SetStateAction<string[]>>;
    tools: string[];
    setTools: React.Dispatch<React.SetStateAction<string[]>>;
    categories: string[];
    setCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const SearchContext = createContext<SearchContextType>({
    searchQuery: '',
    setSearchQuery: () => { },
    ingredients: [],
    setIngredients: () => { },
    tools: [],
    setTools: () => { },
    categories: [],
    setCategories: () => { },
});

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [tools, setTools] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        console.log(tools);
    }, [tools]);

    return (
        <SearchContext.Provider value={{
            searchQuery,
            setSearchQuery,
            ingredients,
            setIngredients,
            tools,
            setTools,
            categories,
            setCategories
        }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = () => useContext(SearchContext);
