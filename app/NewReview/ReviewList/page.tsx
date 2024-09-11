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
    <div className="p-4 w-full">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="rounded border mb-4 p-4 w-[400px]  bg-gray-200 space-x-4"
        >
          <div className="flex items-center gap-2 ">
            <h4 className="text-lg font-bold">{review.name}</h4>
            <div
              key={review.difficulty}
              className="text-sm font-bold px-2 py-1 rounded border border-gray-300 bg-green-500 text-white"
              style={{
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                width: "20px",
                height: "20px",
                textAlign: "center",
                lineHeight: "20px",
              }}
            >
              {review.difficulty}
            </div>

            <StarRating rating={review.rating} />
          </div>
          <p className="text-gray-600 text-left">{review.comment}</p>
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
