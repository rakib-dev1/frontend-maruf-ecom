"use client";
import ProductCard from "@/components/shared/product-card/product-card";
import GetProducts from "@/lib/get_products";
import React from "react";
interface Products {
  _id: number;
  id: number;
  name: string;
  title: string;
  price: number;
  image: string;
}
const Products = () => {
  const [products, setProducts] = React.useState<Products[]>([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const response = await GetProducts();
      setProducts(response);
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
