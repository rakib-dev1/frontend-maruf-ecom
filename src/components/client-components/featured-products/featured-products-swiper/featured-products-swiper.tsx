"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "@/components/shared/product-card/product-card";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import { Navigation, Grid } from "swiper/modules";
import { useState, useEffect } from "react";

interface Product {
  _id: number;
  id: number;
  name: string;
  price: number;
  title: string;
  image: string;
}

const FeaturedProductSwiper = ({ products }: { products: Product[] }) => {
  const [slidesPerView, setSlidesPerView] = useState(5);

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(2);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(4);
      } else {
        setSlidesPerView(6);
      }
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);

    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={0}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      modules={[Navigation, Grid]}
      className="mySwiper"
      grid={{ rows: 2, fill: "row" }}
    >
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5   mt-10 ">
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </div>
    </Swiper>
  );
};

export default FeaturedProductSwiper;
