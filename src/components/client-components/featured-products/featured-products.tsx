"use client";
import GetFeaturedProducts from "@/lib/get_featured_products";

import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import FeaturedProductSwiper from "./featured-products-swiper/featured-products-swiper";
interface Product {
  _id: string;
  id: number;
  name: string;
  title: string;
  map: string;
  price: number;
  image: string;
}

const FeaturedProducts: React.FC & {
  preload?: () => Promise<Product[]>;
} = () => {
  const [featuredProducts, setFeaturedProducts] = React.useState<Product[]>([]);

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
    <div className="mt-5 mb-10 px-5">
      <div className="flex justify-between items-center my-1">
        <h1 className="text-2xl font-semibold">Featured Products</h1>
        <Link href="/products">
          <Button>View All</Button>
        </Link>
      </div>
      <Separator />
      <FeaturedProductSwiper products={featuredProducts} />
    </div>
  );
};

export default FeaturedProducts;
