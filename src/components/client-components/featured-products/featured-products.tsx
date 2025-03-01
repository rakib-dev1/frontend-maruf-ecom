"use client";

import GetProducts from "@/lib/get_products";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import FeaturedProductSwiper from "./featured-products-swiper/featured-products-swiper";

interface Product {
  _id: string;
  name: string;
  title: string;
  map: string;
  price: number;
  images: string[];
}

const FeaturedProducts: React.FC<{ initialProducts?: Product[] }> & {
  preload?: () => Promise<Product[]>;
} = ({ initialProducts = [] }) => {
  const [featuredProducts, setFeaturedProducts] =
    React.useState<Product[]>(initialProducts);

  useEffect(() => {
    if (initialProducts.length === 0) {
      const fetchFeaturedProducts = async () => {
        try {
          const response = await GetProducts();
          setFeaturedProducts(response);
        } catch (error) {
          console.error(error);
        }
      };
      fetchFeaturedProducts();
    }
  }, [initialProducts]);

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

// Preload function for fetching data before rendering
FeaturedProducts.preload = async () => {
  return await GetProducts();
};

export default FeaturedProducts;

export async function getServerSideProps() {
  const initialProducts = FeaturedProducts.preload
    ? await FeaturedProducts.preload()
    : [];
  return {
    props: { initialProducts },
  };
}
