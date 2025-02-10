"use client";

import { usePathname } from "next/navigation";

const ProductsPage = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean); // Removes empty segments

  const category = pathSegments[1] || "All Products"; // Extract category (2nd segment)
  const subcategory = pathSegments[2] || null;
  // Extract subcategory (3rd segment)
  console.log(pathname);
  console.log(subcategory);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Products Page</h1>
      <p className="mt-2 text-gray-600">Current Path: {pathname}</p>
      <h2 className="mt-4 text-xl font-semibold">Category: {category}</h2>
      {subcategory && (
        <h3 className="mt-2 text-lg">Subcategory: {subcategory}</h3>
      )}
    </div>
  );
};

export default ProductsPage;
