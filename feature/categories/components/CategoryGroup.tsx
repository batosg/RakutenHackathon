import React from 'react';
import { Category } from '@/types/categories';

interface CategoryGroupProps {
    categoryGroup: {
        group_name: string;
        categories: Category[];
    };
    selectedCategories: string[];
    onCategoryToggle: (categoryId: string, categoryName: string) => void;
}

const CategoryGroup: React.FC<CategoryGroupProps> = ({
    categoryGroup,
    selectedCategories,
    onCategoryToggle,
}) => {
    return (
        <div className="mb-4">
            <h3 className="font-semibold text-xs mb-2">{categoryGroup.group_name}</h3>
            <div className="flex flex-wrap gap-2">
                {categoryGroup.categories.map((category) => (
                    <label
                        key={category.category_id}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${selectedCategories.includes(category.category_name)
                            ? 'bg-accent text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={selectedCategories.includes(category.category_name)}
                            onChange={() => onCategoryToggle(category.category_id, category.category_name)}
                        />
                        {category.category_name}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default CategoryGroup;