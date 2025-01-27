"use client";
import ProductCard from "@/components/shared/product-card/product-card";
import GetFeaturedProducts from "@/lib/get_featured_products";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = React.useState([]);
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await GetFeaturedProducts();
        setFeaturedProducts(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="mt-5 min-h-screen px-5">
      <div className="flex justify-between items-center my-1">
        <h1 className="text-2xl font-semibold">Featured Products</h1>
        <Link href="">
          <Button>View All</Button>
        </Link>
      </div>
      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5  justify-items-center">
        {featuredProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
