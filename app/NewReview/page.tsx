"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import CircleOutlineWithImage from "./CircleImage/page";

const AddReview = ({
  onAddReview = (review: { rating: number; comment: string }) => {
    console.log("Review submitted:", review);
  },
}: {
  onAddReview: (review: { rating: number; comment: string }) => void;
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    onAddReview({ rating, comment });
    setRating(0);
    setComment("");
  };

  return (
    <div className="mt-4 add-review">
      <h2>Add a Review</h2>
      <CircleOutlineWithImage
        user={{
          name: "楽天太郎",
          image:
            "https://fastly.picsum.photos/id/831/200/300.jpg?hmac=IC6dJVWWVnJ-extXtn0D9QDwKwbQ-tA_M6UD2T9zUbQ",
        }}
      />
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
          className="h-48 border-2 border-gray-300 rounded-lg p-4 placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          id="comment"
          value={comment}
          outline-color="red"
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your review here..."
        />
        <button
          style={{
            backgroundColor: "#BF0000",
            borderColor: "#BF0000",
          }}
          className="hover:bg-red-700 text-white font-bold py-2 px-4 border rounded mt-4"
          onClick={handleSubmit}
        >
          レビューを投稿する
        </button>
        <Link href="../../">Go to Home Page</Link>
      </div>
    </div>
  );
};
export default AddReview;
