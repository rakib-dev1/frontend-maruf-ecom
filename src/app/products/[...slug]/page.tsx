"use client";

import ProductCard from "@/components/shared/product-card/product-card";
import GetProducts from "@/lib/get_products";
import { notFound, useParams } from "next/navigation";

import React from "react";
interface Products {
  _id: string;
  name: string;
  title: string;
  price: number;
  image: string;
}

const DynamicProductsPage = () => {
  const params = useParams();
  const slug = params?.slug || [];
  if (!slug.length) {
    notFound();
  }

  const category = slug[0];
  const subcategory = slug[1] || null;
  const [products, setProducts] = React.useState<Products[]>([]);
  console.log(category);
  React.useEffect(() => {
    const fetchProducts = async () => {
      const response = await GetProducts(category, subcategory || undefined);
      setProducts(response);
    };
    fetchProducts();
  }, [category, subcategory]);
  return (
    <React.Fragment>
      <div className="text-center">
        {category || subcategory ? (
          <>
            <h1>{category}</h1> <h1>{subcategory}</h1>{" "}
          </>
        ) : null}
      </div>
      {products?.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found</p>
      )}
    </React.Fragment>
  );
};

export default DynamicProductsPage;
