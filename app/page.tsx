// pages/index.tsx

import Link from "next/link";

const Home = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <Link href="/reviews">Go to Review Page</Link>
    </div>
  );
};

export default Home;
