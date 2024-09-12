export interface Category {
    category_id: string;
    category_name: string;
    category_image: string;
}

export interface CategoryGroup {
    category_group: string;
    category: Category[];
}