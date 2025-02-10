"use client";

import { useRouter } from "next/router";

const SubcategoryPage = () => {
  const router = useRouter();
  const { category, subcategory } = router.query; // Extract category and subcategory from URL

  return (
    <div>
      <h1 className="text-2xl font-bold">Category: {category}</h1>
      <h2 className="text-xl">Subcategory: {subcategory}</h2>
      <p>Here are the products for {subcategory} in the {category} category.</p>
      {/* You can add more logic to display products or other content for this subcategory */}
    </div>
  );
};

export default SubcategoryPage;
