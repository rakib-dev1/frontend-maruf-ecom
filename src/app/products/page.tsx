"use client";
import ProductCard from "@/components/shared/product-card/product-card";
import GetProducts from "@/lib/get_products";
import React from "react";
import { useSession } from "next-auth/react";

interface Products {
  _id: string;
  title: string;
  price: number;
  image: string;
}


const Products = () => {
  const { data: session } = useSession(); // Get session and authentication status
  console.log(session);
  const [products, setProducts] = React.useState<Products[]>([]);

  React.useEffect(() => {
    if (session?.accessToken) {
      fetch("http://localhost:5000/products", {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      })
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error("Error fetching products:", err));
    }
  }, [session]);

  if (!session) return <p>Please login to view products.</p>;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <p>No products available or user is not logged in.</p>
      )}
    </div>
  );
};

export default Products;
