import React from 'react'

interface IngredientProps {
    name: string;
    amount: string;
}

const RecipeItem = ({ name, amount }: IngredientProps) => {
    return (
        <li>
            <div className="flex justify-between border-b-2 border-gray-500 ">
                <p>{name}</p>
                <p>{amount}</p>
            </div>
        </li>
    )
}

export default RecipeItem