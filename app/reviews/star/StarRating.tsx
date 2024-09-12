import React from "react";

const StarRating: React.FC<{ rating: number; maxStars?: number }> = ({
  rating,
  maxStars = 5,
}) => {
  const stars = Array(maxStars)
    .fill(false)
    .map((_, index) => index < rating);

  return (
    <div style={styles.starContainer}>
      {stars.map((filled, index) => (
        <span key={index} style={styles.star}>
          {filled ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

const styles = {
  starContainer: {
    display: "flex",
    fontSize: "24px",
    color: "#ffcc00",
    marginBottom: "10px",
  },
  star: {
    marginRight: "2px",
  },
};

export default StarRating;
