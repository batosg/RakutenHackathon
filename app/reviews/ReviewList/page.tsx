"use client";

import { useParams, useRouter } from "next/navigation";
import StarRating from "../star/StarRating";
import Badge from "../Badge/page";
import useApi from "@/hooks/useApi";
import { useEffect } from "react";
import { useState } from "react";

const ReviewList = ({
  reviews,
}: {
  reviews: Array<{
    review_id: string;
    name: string;
    user_id?: string;
    rating: number;
    comment?: string;
    created_at?: Date;
    ease_of_ingredient_acquisition?: number;
    ease_of_long_term_storage?: number;
    would_eat_again?: number;
    difficulty: number;
  }>;
}) => {
  const router = useRouter();
  const handleClick = (review_id: string) => {
    router.push(`/reviews/${review_id}`);
  };

  const params = useParams();
  useEffect(() => {
    console.log(params, "aaa");
  }, [params]);

  const { data, error, loading, refetch } = useApi();
  useEffect(() => {
    refetch(`/reviews/recipe/2138a252-ceb7-4906-8c1d-5bd7f636218e`, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    });
  }, [refetch]);
  useEffect(() => {}, [data]);

  return (
    <div className="p-4 w-full">
      {reviews?.map((review, index) => (
        <div
          key={review.review_id}
          className="rounded border mb-4 p-4 w-[400px] bg-gray-200 space-x-4 cursor-pointer"
          onClick={() => handleClick(review.review_id)}
        >
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-bold">{data?.[index]?.user.name}</h4>

            <StarRating rating={review.rating} />
            <div className="flex flex-col space-y-4 p-6 bg-gray-100 rounded-lg shadow-md">
              <Badge children={review.ease_of_ingredient_acquisition} />
              <Badge children={review.ease_of_long_term_storage} />
              <Badge children={review.would_eat_again} />
            </div>
          </div>
          <p className="text-gray-600 text-left">{review.comment}</p>
        </div>
      ))}{" "}
    </div>
  );
};
export default ReviewList;
