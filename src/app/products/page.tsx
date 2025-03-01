"use client";
import ProductCard from "@/components/shared/product-card/product-card";
import GetProducts from "@/lib/get_products";
import React from "react";

interface Products {
  _id: string;
  title: string;
  price: number;
  image: string;
  images: Array<string>;
}

const Products = () => {
  const [products, setProducts] = React.useState<Products[]>([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await GetProducts();
        setProducts(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;
