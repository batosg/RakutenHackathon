"use client";

import Link from "next/link";
import React, { useState } from "react";
import CircleOutlineWithImage from "./CircleImage/page";
import { ProfileImage } from "@/public/";
import ReviewList from "./ReviewList/page"; // Adjust the import path if necessary

const AddReview = () => {
  const [reviews, setReviews] = useState([
    {
      id: "1",
      name: "Rakuten Batos",
      rating: 4,
      comment: "This product is great!",
      difficulty: 3,
    },
    { id: "2", name: "Bob", rating: 3, comment: "Not good", difficulty: 2 },
    { id: "3", name: "Charlie", rating: 5, comment: "Nice", difficulty: 4 },
    {
      id: "4",
      name: "Diana",
      rating: 2,
      comment: "This product is bad!",
      difficulty: 1,
    },
  ]);
  const user = {
    name: "楽天太郎",
    image: ProfileImage,
  };
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [files, setFiles] = useState<
    Array<{ name: string; path: string; url?: string }>
  >([]);

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

    setReviews((prevReviews) => [
      ...prevReviews,
      { ...newReview, id: String(prevReviews.length + 1), name: user.name },
    ]);

    setRating(0);
    setComment("");
    setDifficulty(1);
  };
  const calculateAverageRating = () => {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return reviews.length ? (totalRating / reviews.length).toFixed(1) : 0;
  };

  const calculateAverageDifficulty = () => {
    const totalDifficulty = reviews.reduce(
      (sum, review) => sum + review.difficulty,
      0
    );
    return reviews.length ? (totalDifficulty / reviews.length).toFixed(1) : 0;
  };

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
          <div className="flex items-center justify-between mt-4 mb-4">
            <label className="text-lg font-semibold mr-4">料理の難易度</label>
            <div className="flex space-x-4">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`cursor-pointer text-lg font-bold px-2 py-1 rounded ${
                    level === difficulty
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {level}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 ">
            {files.map((file, index) => (
              <div key={index} className="mb-2">
                <img
                  src={file.url}
                  alt={file.name}
                  className="max-w-xs h-auto"
                />
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold">
              {calculateAverageRating()}
              <span
                className="inline-block"
                style={{ color: "#ffc107", fontSize: "1.5rem" }}
              >
                ★
              </span>{" "}
            </h3>

            <h3 className="text-xl font-semibold">
              <div
                className="text-lg font-bold px-2 py-1 rounded bg-green-500 text-white"
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "40px",
                  height: "40px",
                  textAlign: "center",
                  lineHeight: "20px",
                }}
              >
                {calculateAverageDifficulty()}
              </div>
            </h3>
          </div>
        </div>
        <Link href="../../">Go to Home Page</Link>
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
};
export default AddReview;
