export interface CategoryGroup {
    categories: Category[];
    group_name: string;
}

export interface Category {
    category_group: null;
    category_id: string;
    category_image: null;
    category_name: string;
    created_at: string;
    updated_at: string;
}