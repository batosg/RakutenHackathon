"use client";

import Link from "next/link";
import React, { useState } from "react";
import CircleOutlineWithImage from "./CircleImage/page";
import { ProfileImage } from "@/public/";
import ReviewList from "./ReviewList/page"; // Adjust the import path if necessary
import { useEffect } from "react";
import useApi from "@/hooks/useApi";

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
  const [acc, setAcc] = useState(1);
  const [stor, setStor] = useState(1);
  const [eat, setEat] = useState(1);
  const [files, setFiles] = useState<
    Array<{ name: string; path: string; url?: string }>
  >([]);
  const user_id = "988ad7ee-03f2-4b4c-a1c8-8bea6eed5d18";
  const { data, error, loading, refetch } = useApi();
  useEffect(() => {
    refetch(`/reviews/recipe/2138a252-ceb7-4906-8c1d-5bd7f636218e`, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    });
    console.log("test");
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

    setReviews((prevReviews) => [
      ...prevReviews,
      { ...newReview, id: String(prevReviews.length + 1), name: user.name },
    ]);

    setRating(0);
    setComment("");
    setDifficulty(1);
    setAcc(1);
    setStor(1);
    setEat(1);
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
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-4">
              <label className="text-lg font-semibold">料理の難易度</label>
              <div className="flex space-x-6">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`cursor-pointer text-lg font-bold px-3 py-1 rounded ${
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

            <div className="flex flex-col space-y-4">
              <label className="text-lg font-semibold">
                材料の入手のしやすさ
              </label>
              <div className="flex space-x-6">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    onClick={() => setAcc(level)}
                    className={`cursor-pointer text-lg font-bold px-3 py-1 rounded ${
                      level === acc ? "bg-green-500 text-white" : "bg-gray-200"
                    }`}
                  >
                    {level}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <label className="text-lg font-semibold">
                長期保存のしやすさ
              </label>
              <div className="flex space-x-6">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    onClick={() => setStor(level)}
                    className={`cursor-pointer text-lg font-bold px-3 py-1 rounded ${
                      level === stor ? "bg-green-500 text-white" : "bg-gray-200"
                    }`}
                  >
                    {level}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <label className="text-lg font-semibold">
                もう一度食べたいと思いますか？
              </label>
              <div className="flex space-x-6">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    onClick={() => setEat(level)}
                    className={`cursor-pointer text-lg font-bold px-3 py-1 rounded ${
                      level === eat ? "bg-green-500 text-white" : "bg-gray-200"
                    }`}
                  >
                    {level}
                  </div>
                ))}
              </div>
            </div>

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

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">
                {calculateAverageRating()}
                <span
                  className="inline-block text-yellow-500"
                  style={{ fontSize: "1.5rem" }}
                >
                  ★
                </span>
              </h3>

              <h3 className="text-xl font-semibold">
                <div
                  className="text-lg font-bold px-4 py-2 rounded bg-green-500 text-white inline-flex items-center justify-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    textAlign: "center",
                  }}
                >
                  {calculateAverageDifficulty()}
                </div>
              </h3>
            </div>
          </div>
        </div>
        <Link href="../../">Go to Home Page</Link>
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
};
export default AddReview;
