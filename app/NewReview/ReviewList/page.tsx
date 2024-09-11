import StarRating from "../../reviews/StarRating";

const ReviewList = ({
  reviews,
}: {
  reviews: Array<{
    id: string;
    name: string;
    rating: number;
    comment: string;
    difficulty: number;
  }>;
}) => {
  return (
    <div style={styles.reviewList}>
      {reviews.map((review) => (
        <div key={review.id}>
          <h4 style={styles.name}>
            {review.name}
            <div
              key={review.difficulty}
              className={`text-sm font-bold px-2 py-1 rounded border border-gray-300 ${"bg-green-500 text-white"}`}
              style={{
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                width: "20px", // Width of the box
                height: "20px", // Height of the box
                textAlign: "center",
                lineHeight: "20px", // Match line height to height of the box
              }}
            >
              {review.difficulty}
            </div>
          </h4>
          <StarRating rating={review.rating} />
          <p style={styles.comment}>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  reviewList: {
    padding: "20px",
  },
  name: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  comment: {
    fontSize: "16px",
    color: "#555",
  },
};

export default ReviewList;
