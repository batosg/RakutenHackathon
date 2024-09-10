import React from "react";
import StarRating from "../reviews/StarRating"; // Adjust the import path as needed
import Link from "next/link";

const ReviewPage = () => {
  const review = {
    title: "In-Depth Review of the XYZ Smartphone",
    reviewer: "Jane Doe",
    date: "September 10, 2024",
    summary:
      "The XYZ Smartphone combines sleek design with cutting-edge technology. This review explores its features, performance, and overall value.",
    features: [
      "Display: 6.7-inch AMOLED screen with 120Hz refresh rate",
      "Camera: Triple camera setup with 64MP main sensor",
      "Battery: 5000mAh battery with fast charging",
    ],
    pros: [
      "Stunning display with vibrant colors",
      "Excellent camera performance",
      "Long-lasting battery life",
    ],
    cons: [
      "Expensive compared to competitors",
      "Bulky design may not suit all users",
    ],
    performance:
      "The XYZ Smartphone performs exceptionally well, handling multitasking and gaming with ease. However, the large size can be cumbersome for one-handed use.",
    comparison:
      "Compared to the ABC Smartphone, the XYZ offers better camera quality but lacks the ABC's sleek design. The choice between the two depends on whether you prioritize camera performance or design aesthetics.",
    recommendations:
      "Ideal for users who want a high-end smartphone with top-notch features. Not recommended for those on a budget.",
    conclusion:
      "The XYZ Smartphone is a powerful device with some minor drawbacks. It's worth considering if you're looking for premium features and performance.",
    rating: {
      overall: 4.5,
      quality: 5,
      valueForMoney: 3.5,
      easeOfUse: 4,
      customerSupport: 4,
    },
    price: "$899",
    whereToBuy: "https://example.com/buy-xyz-smartphone",
    manufacturer: "XYZ Corporation",
    officialWebsite: "https://xyzcorp.com",
  };

  return (
    <div style={styles.container}>
      <h1 style={{ textAlign: "center" as const, color: "#333" }}>
        {review.title}
      </h1>
      <p style={styles.info}>
        <strong>Reviewed by:</strong> {review.reviewer}
        <br />
        <strong>Date:</strong> {review.date}
      </p>
      <h2 style={styles.sectionTitle}>Summary</h2>
      <p>{review.summary}</p>
      <h2 style={styles.sectionTitle}>Detailed Review</h2>
      <h3>Features and Benefits</h3>
      <ul>
        {review.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <h3>Pros and Cons</h3>
      <div style={styles.prosConsContainer}>
        <div style={styles.prosConsList}>
          <h4>Pros:</h4>
          <ul>
            {review.pros.map((pro, index) => (
              <li key={index}>{pro}</li>
            ))}
          </ul>
        </div>
        <div style={styles.prosConsList}>
          <h4>Cons:</h4>
          <ul>
            {review.cons.map((con, index) => (
              <li key={index}>{con}</li>
            ))}
          </ul>
        </div>
      </div>
      <h3>Performance and Experience</h3>
      <p>{review.performance}</p>
      <h3>Comparison</h3>
      <p>{review.comparison}</p>
      <h3>Recommendations</h3>
      <p>{review.recommendations}</p>
      <h3>Conclusion</h3>
      <p>{review.conclusion}</p>
      <h2 style={styles.sectionTitle}>Rating</h2>
      <strong>Overall Rating:</strong>{" "}
      <StarRating rating={review.rating.overall} />
      <ul>
        <li>
          <strong>Quality:</strong>{" "}
          <StarRating rating={review.rating.quality} />
        </li>
        <li>
          <strong>Value for Money:</strong>{" "}
          <StarRating rating={review.rating.valueForMoney} />
        </li>
        <li>
          <strong>Ease of Use:</strong>{" "}
          <StarRating rating={review.rating.easeOfUse} />
        </li>
        <li>
          <strong>Customer Support:</strong>{" "}
          <StarRating rating={review.rating.customerSupport} />
        </li>
      </ul>
      <h2 style={styles.sectionTitle}>Additional Information</h2>
      <p>
        <strong>Price:</strong> {review.price}
      </p>
      <p>
        <strong>Where to Buy:</strong>{" "}
        <a href={review.whereToBuy} target="_blank" rel="noopener noreferrer">
          Buy here
        </a>
      </p>
      <p>
        <strong>Manufacturer/Provider:</strong> {review.manufacturer}
      </p>
      <p>
        <strong>Official Website:</strong>{" "}
        <a
          href={review.officialWebsite}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit website
        </a>
      </p>
      <Link href="../">Go to Home Page</Link>
    </div>
  );
};

// Basic styling for the review page
const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#333",
  },
  info: {
    fontStyle: "italic",
    marginBottom: "20px",
  },
  sectionTitle: {
    marginTop: "20px",
    borderBottom: "2px solid #eee",
    paddingBottom: "10px",
    color: "#555",
  },
  prosConsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  prosConsList: {
    width: "48%",
  },
};

export default ReviewPage;
