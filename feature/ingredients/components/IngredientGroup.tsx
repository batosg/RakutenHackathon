import React from 'react';
import { Ingredient } from '@/types/ingredients';

interface IngredientGroupProps {
    ingredientGroup: {
        group_name: string;
        ingredients: Ingredient[];
    };
    selectedIngredients: string[];
    onIngredientToggle: (ingredientId: string, ingredientName: string) => void;
}

const IngredientGroup: React.FC<IngredientGroupProps> = ({
    ingredientGroup,
    selectedIngredients,
    onIngredientToggle,
}) => {
    return (
        <div className="mb-4">
            <h3 className="font-semibold text-xs mb-2">{ingredientGroup.group_name}</h3>
            <div className="flex flex-wrap gap-2">
                {ingredientGroup.ingredients.map((ingredient) => (
                    <label
                        key={ingredient.ingredient_id}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${selectedIngredients.includes(ingredient.name)
                            ? 'bg-accent text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={selectedIngredients.includes(ingredient.name)}
                            onChange={() => onIngredientToggle(ingredient.ingredient_id, ingredient.name)}
                        />
                        {ingredient.name}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default IngredientGroup;