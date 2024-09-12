"use client";
import { Category } from '@/types';
import React, { useState } from 'react'
import { CategoryItem } from '..';
import { BiChevronDown } from 'react-icons/bi';

interface CategoryCollapseProps {
    categoryGroup: string;
    category: Category[];
    isInitialOpen: boolean;
}

const CategoryCollapse = ({ categoryGroup, category, isInitialOpen = false }: CategoryCollapseProps) => {

    const [isOpen, setIsOpen] = useState(isInitialOpen);
    const toggleCollapse = () => {
        setIsOpen(value => !value);
    }

    return (
        <div className='mb-2'>
            <div className="flex justify-between items-center px-4 py-2 rounded-sm bg-gray-50" onClick={toggleCollapse}>
                <p className="text-md font-bold">{categoryGroup}</p>
                <button className="text-md font-bold">
                    <BiChevronDown size={24}
                        style={{ transition: 'transform 300ms', transform: isOpen ? 'rotate(180deg)' : 'none' }}
                    />
                </button>
            </div>
            {isOpen && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {category.map((category) => (
                        <CategoryItem key={category.category_id} category={category} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default CategoryCollapse