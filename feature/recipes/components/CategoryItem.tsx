import React from 'react'
import Image from 'next/image';
import { Category } from '@/types';
import { KatsuCurry } from '@/public/index'

interface CategoryItemProps {
    category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
    return (
        <div className="flex items-center border border-gray-50 p-2">
            <Image src={KatsuCurry} alt={category.category_name} width={48} height={48} className="rounded-full aspect-square" />
            <div className="ml-2 text-black">{category.category_name}</div>
        </div>
    )
}

export default CategoryItem