"use client";

import { useParams } from "next/navigation";

const CategoryPage = () => {
  const { category } = useParams();
  // Extract category from URL
  console.log(category);
  return (
    <div>
      <h1 className="text-2xl font-bold">Category: {category}</h1>
      <p>Here are the products for {category}.</p>
      {/* You can add more logic to display products or any other related content here */}
    </div>
  );
};

export default CategoryPage;
