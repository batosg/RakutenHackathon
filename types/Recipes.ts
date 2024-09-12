export interface Category {
    category_id: string;
    category_name: string;
    category_image: string;
}

export interface CategoryGroup {
    category_group: string;
    category: Category[];
}

export interface Recipe {
    category_id: null;
    cooking_time: number;
    cost: number | number;
    created_at: string;
    description: string;
    difficulty: string;
    image_url: string;
    ingredients: Ingredient[];
    recipe_id: string;
    reviews: Review[];
    servings: number;
    title: string;
    tools: Tool[];
    updated_at: string;
}

export interface Ingredient {
    ingredient_id?: string;
    name?: string;
    quantity?: number;
}

export interface Review {
    comment: string;
    created_at: string;
    ease_of_ingredient_acquisition: number;
    ease_of_long_term_storage: number;
    rating: number;
    recipe_id: string;
    review_id: string;
    updated_at: string;
    user: User;
    user_id: string;
    would_eat_again: number;
}

export interface User {
    created_at: string;
    email: string;
    name: string;
    rakuten_id: string;
    updated_at: string;
    user_id: string;
}

export interface Tool {
    category?: string;
    description?: string;
    name?: string;
    tool_id?: string;
}
