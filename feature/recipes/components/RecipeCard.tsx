import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import IconImage from "./IconImage";
import StarRating from "@/app/reviews/StarRating";

interface Recipe {
    recipe_id: string;
    title: string;
    description: string;
    cooking_time: number;
    cost: number;
    servings: number;
    difficulty: string;
    created_at: string;
    category_id: string;
    image_url: string;
    ingredients: Ingeredient[];
}

interface Ingredients{
    
}