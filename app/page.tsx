// pages/index.tsx

import Link from "next/link";

const Home = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Hello World</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <Link href="/reviews">Go to Review Page</Link>
        <Link href="/reviews/NewReview">Add a review</Link>
      </div>
    </div>
  );
};

export default Home;
