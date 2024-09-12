'use client';
import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext<{
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}>({
    searchQuery: '',
    setSearchQuery: () => { },
});

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = () => useContext(SearchContext);
