"use client";
import React from 'react'
import { CategoryItem } from '../../recipes';
import Collapse from '@/components/Collapse';
import { Category } from '@/types/categories';

interface CategoryCollapseProps {
    categoryGroup: string;
    category: Category[];
    isInitiallyOpen?: boolean;
}

const CategoryCollapse = ({ categoryGroup, category, isInitiallyOpen = false }: CategoryCollapseProps) => {

    return (
        <Collapse title={categoryGroup} isInitiallyOpen={isInitiallyOpen}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {category.map((category) => (
                    <CategoryItem key={category.category_id} category={category} />
                ))}
            </div>
        </Collapse>
    )
}

export default CategoryCollapse