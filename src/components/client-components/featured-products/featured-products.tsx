"use client";
import GetFeaturedProducts from "@/lib/get_featured_products";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import ProductCard from "@/components/shared/product-card/product-card";
const FeaturedProducts = () => {
  interface Product {
    _id: string;
    id: number;
    name: string;
    title: string;
    map: string;
    price: number;
    image: string;
  }

  const [featuredProducts, setFeaturedProducts] = React.useState<Product[]>([]);
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free",
    slides: {
      perView: 5,
      spacing: 15,
    },
  });
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
      <div ref={ref} className="keen-slider">
        {featuredProducts.map((p) => (
          <div key={p._id} className="keen-slider__slide">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
