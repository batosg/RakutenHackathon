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
          url, // Add a URL for image preview
        };
      });

      setFiles(fileArray);
    }
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
          className="h-48 border-2 border-gray-300 rounded-lg p-4 placeholder-gray-500 focus:border-blue-500 focus:outline-none shadow-xl"
          id="comment"
          value={comment}
          outline-color="red"
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
          <div className="flex-grow"></div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {files.map((file, index) => (
              <div key={index} className="mb-2">
                {file.url && (
                  <img
                    src={file.url}
                    alt={file.name}
                    className="max-w-xs h-auto"
                  />
                )}
                <p>{file.path}</p>
              </div>
            ))}
          </div>
        </div>
        <Link href="../../">Go to Home Page</Link>
      </div>
    </div>
  );
};
export default AddReview;
