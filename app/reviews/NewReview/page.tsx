"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

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
    <div className="add-review">
      <h2>Add a Review</h2>
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
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your review here..."
        />
        <button onClick={handleSubmit}>Submit Review</button>
        <Link href="../../">Go to Home Page</Link>
      </div>
    </div>
  );
};
export default AddReview;
