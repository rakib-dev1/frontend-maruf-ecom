"use client";

import ProductCard from "@/components/shared/product-card/product-card";
import GetProducts from "@/lib/get_products";
import { useParams, notFound } from "next/navigation";
import React from "react";
interface Products {
  _id: number;
  id: number;
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
  console.log(products);
  React.useEffect(() => {
    const fetchProducts = async () => {
      const response = await GetProducts(category, subcategory || undefined);
      setProducts(response);
    };
    fetchProducts();
  }, [category, subcategory]);
  return (
    <React.Fragment>
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
