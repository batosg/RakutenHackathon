"use client";

import React, { useEffect, useState, useRef } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import { useSearchContext } from '@/feature/recipes/contexts/SearchContext'
import { CategoryGroup, useCategory } from '@/feature/categories'
import { ToolGroup, useTools } from '@/feature/tools'
import { Collapse } from '@/components'
import { IngredientGroup, useIngredients } from '@/feature/ingredients';

const Searchbar: React.FC = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const router = useRouter()
    const { setSearchQuery, setIngredients, setTools, setCategories, categories, ingredients, tools } = useSearchContext()
    const searchRef = useRef<HTMLDivElement>(null);

    const { categoryGroups, loading: categoryLoading, error: categoryError, fetchCategories } = useCategory();
    const { toolGroups, error: toolsError, loading: toolsLoading, fetchTools } = useTools();
    const { ingredientGroups, error: ingredientsError, loading: ingredientsLoading, fetchIngredients } = useIngredients();

    useEffect(() => {
        fetchCategories();
        fetchTools();
        fetchIngredients();
    }, [fetchCategories, fetchTools, fetchIngredients]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const query = (e.currentTarget.elements.namedItem('search') as HTMLInputElement).value;
        setSearchQuery(query);
        pushSearchRoute(query);
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = e.currentTarget.value;
            setSearchQuery(query);
            pushSearchRoute(query);
            handleClose();
        }
    }

    const pushSearchRoute = (query: string) => {
        const searchParams = new URLSearchParams();
        searchParams.append('query', query);
        if (categories.length > 0) {
            searchParams.append('categories', categories.join(','));
        }
        if (ingredients.length > 0) {
            searchParams.append('ingredients', ingredients.join(','));
        }
        if (tools.length > 0) {
            searchParams.append('tools', tools.join(','));
        }
        router.push(`/recipes/search?${searchParams.toString()}`);
    }

    const handleFocus = () => setIsSearchOpen(true);
    const handleClose = () => setIsSearchOpen(false);

    const handleOutsideClick = (e: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
            handleClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleCategoryToggle = (categoryId: string, categoryName: string) => {
        setCategories((prev) =>
            prev.includes(categoryName)
                ? prev.filter((name) => name !== categoryName)
                : [...prev, categoryName]
        );
    };

    const handleToolToggle = (toolId: string, toolName: string) => {
        setTools((prev) =>
            prev.includes(toolName)
                ? prev.filter((name) => name !== toolName)
                : [...prev, toolName]
        );
    };

    const handleIngredientToggle = (ingredientId: string, ingredientName: string) => {
        setIngredients((prev) =>
            prev.includes(ingredientName)
                ? prev.filter((name) => name !== ingredientName)
                : [...prev, ingredientName]
        );
    };

    return (
        <div className="relative w-full" ref={searchRef}>
            <form onSubmit={handleSubmit} className="relative z-50">
                <input
                    type="text"
                    name="search"
                    placeholder="材料、道具、料理名で検索"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={handleKeyPress}
                    onFocus={handleFocus}
                />
                <BiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl ${isSearchOpen ? 'text-blue-500' : ''}`} />
            </form>
            {isSearchOpen && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleClose}></div>
                    <div className="absolute left-0 right-0 top-full bg-white border border-gray-300 mt-1 p-4 rounded-lg shadow-lg z-50 max-h-[500px] overflow-y-auto">
                        <div className="flex flex-col gap-4">
                            <Collapse title="カテゴリー">
                                {categoryGroups?.map((categoryGroup) => (
                                    <CategoryGroup
                                        key={categoryGroup.group_name}
                                        categoryGroup={categoryGroup}
                                        selectedCategories={categories}
                                        onCategoryToggle={handleCategoryToggle}
                                    />
                                ))}
                            </Collapse>
                        </div>
                        <div>
                            <Collapse title="調理器具">
                                {toolGroups.map((toolGroup) => (
                                    <ToolGroup
                                        key={toolGroup.group_name}
                                        toolGroup={toolGroup}
                                        selectedTools={tools}
                                        onToolToggle={handleToolToggle}
                                    />
                                ))}
                            </Collapse>
                        </div>
                        <div>
                            <Collapse title="食材">
                                {ingredientGroups.map((ingredientGroup) => (
                                    <IngredientGroup
                                        key={ingredientGroup.group_name}
                                        ingredientGroup={ingredientGroup}
                                        selectedIngredients={ingredients}
                                        onIngredientToggle={handleIngredientToggle}
                                    />
                                ))}
                            </Collapse>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Searchbar