"use client";

import Link from "next/link";
import React, { useState } from "react";
import CircleOutlineWithImage from "./CircleImage/page";
import { ProfileImage } from "@/public/";
import ReviewList from "./ReviewList/page"; // Adjust the import path if necessary
import { useEffect } from "react";
import useApi from "@/hooks/useApi";
import ReviewCriteria from "./ReviewCriteria/page";

const AddReview = () => {
  const user = {
    name: "楽天太郎",
    image: ProfileImage,
  };
  const [recipe_id, setrecipe_id] = useState("");
  const [user_id, setuser_id] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [ease_of_ingredient_acquisition, setease_of_ingredient_acquisition] =
    useState(1);
  const [ease_of_long_term_storage, setease_of_long_term_storage] = useState(1);
  const [would_eat_again, setwould_eat_again] = useState(1);
  const [files, setFiles] = useState<
    Array<{ name: string; path: string; url?: string }>
  >([]);
  const { data, refetch } = useApi();
  useEffect(() => {
    refetch(`/reviews/recipe/2138a252-ceb7-4906-8c1d-5bd7f636218e`, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    });
  }, [refetch]);
  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles).map((file) => {
        const url = URL.createObjectURL(file);
        return {
          name: file.name,
          path: file.webkitRelativePath || file.name,
          url,
        };
      });

      setFiles(fileArray);
    }
  };

  const handleSubmit = () => {
    const newReview = {
      rating,
      comment,
      difficulty,
    };

    refetch("/review", {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": true,
      },
      data: new URLSearchParams({
        recipe_id
        user_id,
        rating,
        comment,
        ease_of_ingredient_acquisition,
        ease_of_long_term_storage,
        would_eat_again,
    }),
    });

    setRating(0);
    setComment("");
    setDifficulty(1);
    setease_of_ingredient_acquisition(1);
    setease_of_long_term_storage(1);
    setwould_eat_again(1);
  };
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="mt-4 add-review">
      <h2>Add a Review</h2>
      <CircleOutlineWithImage user={user} />
      <div className="form-group">
        <label>Rating:</label>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{
                cursor: "pointer",
                color: star <= rating ? "#ffc107" : "#e4e5e9",
                fontSize: "2rem",
                display: "inline-block",
              }}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="comment">Comment</label>
        <textarea
          className="h-48 border-2 border-gray-300 rounded-lg p-4 placeholder-gray-500 focus:border-blue-500 focus:outline-none shadow-xl "
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your review here..."
        />
        <div>
          <label
            htmlFor="directory-upload"
            className="cursor-pointer bg-blue-500 text-white font-bold border rounded shadow-lg mr-8"
            style={{
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              display: "inline-block",
              textAlign: "center",
              marginTop: "1rem",
            }}
          >
            画像追加
          </label>
          <button
            style={{
              backgroundColor: "#BF0000",
              borderColor: "#BF0000",
              padding: "0.5rem 1rem",
              fontSize: "1rem",
            }}
            className="hover:bg-red-700 text-white font-bold border rounded mt-4 shadow-lg"
            onClick={handleSubmit}
          >
            レビューを投稿する
          </button>
          <input
            id="directory-upload"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="flex flex-col space-y-6">
            <ReviewCriteria />
            <div className="mt-6 grid grid-cols-2 gap-4">
              {files.map((file, index) => (
                <div key={index} className="mb-2">
                  <img
                    src={file.url}
                    alt={file.name}
                    className="max-w-xs h-auto rounded-lg shadow-md"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <ReviewList reviews={data} />
        <Link
          className="bg-accent text-white text-center px-10 py-2 w-full rounded-lg hover:opacity-30"
          href="../../"
        >
          Go to Home Page
        </Link>
      </div>
    </div>
  );
};
export default AddReview;
