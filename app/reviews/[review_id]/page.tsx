"use client";
import { useEffect, useState } from "react";
import StarRating from "../star/StarRating";

import { NextRequest, NextResponse } from "next/server";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import useApi from "@/hooks/useApi";
import { useCallback } from "react";
type ReviewProps = {
  name: string;
  user_id?: string;
  rating: number;
  comment?: string;
  created_at: Date;
  ease_of_ingredient_acquisition: number;
  ease_of_long_term_storage: number;
  would_eat_again: number;
  difficulty: number;
};

const ReviewPage = ({
  name,
  user_id,
  rating,
  comment,
  created_at,
  ease_of_ingredient_acquisition,
  ease_of_long_term_storage,
  would_eat_again,
  difficulty,
}: ReviewProps) => {
  const params = useParams();
  useEffect(() => {
    console.log(params);
  }, [params]);
  const { data, loading, refetch } = useApi();
  const [recipe, setRecipe] = useState<Response | null>(null);

  useEffect(() => {
    refetch(`/reviews/${params.review_id}`, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    });
  }, [refetch, params.review_id]);
  useEffect(() => {
    if (data) {
      setRecipe(data);
      console.log(data);
    }
  }, [data]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!recipe) {
    return <div>No recipe found</div>;
  }
  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex items-center p-6 border-b border-gray-200">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
            {/* Placeholder for user's profile picture */}
          </div>
          <div className="ml-4">
            <p className="text-lg font-semibold text-gray-800">
              {data.user.name}
            </p>
            {/* <p className="text-sm text-gray-500">{created_at.toDateString()}</p> */}
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <p className="text-2xl font-bold text-gray-800 mb-4">Rating</p>
          <div className="flex items-center">
            <StarRating rating={data.rating} />
          </div>
        </div>

        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <p className="text-2xl font-bold text-gray-800 mb-4">Comment</p>
          <p className="text-gray-700">{data.comment}</p>
        </div>

        <div className="p-6 border-b border-gray-200">
          <p className="text-2xl font-bold text-gray-800">
            Ease of Ingredient Acquisition
          </p>
          <StarRating rating={data.ease_of_ingredient_acquisition} />
        </div>

        <div className="p-6 border-b border-gray-200">
          <p className="text-2xl font-bold text-gray-800">
            Ease of Long-Term Storage
          </p>
          <StarRating rating={data.ease_of_long_term_storage} />
        </div>
        <div className="p-6">
          <p className="text-2xl font-bold text-gray-800">Would Eat Again</p>
          <StarRating rating={data.would_eat_again} />
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
