export interface IngredientGroup {
    group_name: string;
    ingredients: Ingredient[];
}

export interface Ingredient {
    category: string;
    created_at: string;
    ingredient_id: string;
    name: string;
    updated_at: string;
}