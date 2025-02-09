"use client";
import ProductCard from "@/components/shared/product-card/product-card";
import GetProducts from "@/lib/get_products";
import { useSearchParams } from "next/navigation";
import React from "react";

interface Product {
  _id: string;
  id: number;
  title: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const Products = () => {
  const searchParams = useSearchParams();
  const category = searchParams?.get("category") || "";
  const subcategory = searchParams?.get("subcategory") || "";

  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await GetProducts(category, subcategory); // Pass both params
        setProducts(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [category, subcategory]); // Run effect when category or subcategory changes

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold my-4">
        Showing: {subcategory || category || "All Products"}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Products;
