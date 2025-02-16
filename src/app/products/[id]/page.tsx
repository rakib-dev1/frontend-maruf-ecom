"use client";
import GetProducts from "@/lib/get_products";
import { useParams } from "next/navigation";
import React from "react";
interface Products {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  stock: number;
  reviews: number;
}

const SingleProducts = () => {
  const params = useParams();
  const id = params?.id || [];
  const [products, setProducts] = React.useState<Products[]>([]);
  console.log("products", products);
  React.useEffect(() => {
    const fetchProducts = async () => {
      const response = await GetProducts();
      setProducts(response);
    };
    fetchProducts();
  }, []);
  console.log("id", id);
  return (
    <React.Fragment>
      <h1>{id}</h1>
    </React.Fragment>
  );
};

export default SingleProducts;
