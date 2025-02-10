"use client";

import { useParams, notFound } from "next/navigation";

const DynamicProductsPage = () => {
  const params = useParams();
  const slug = params?.slug || [];

  if (!slug.length) {
    notFound(); // Ensure we don't allow empty slugs
  }

  const category = slug[0]; // First part of the URL (e.g., "mens-shopping")
  const subcategory = slug[1] || null; // Second part of the URL (e.g., "shirts")

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Category: {category}</h1>
      {subcategory && <h2 className="text-xl">Subcategory: {subcategory}</h2>}
      <p>
        Showing products for{" "}
        {subcategory ? `${subcategory} in ${category}` : category}.
      </p>
    </div>
  );
};

export default DynamicProductsPage;
