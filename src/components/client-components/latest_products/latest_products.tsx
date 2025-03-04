"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import GetProducts from "@/lib/get_products";
import ProductCard from "@/components/shared/product-card/product-card";

type Product = {
  _id: string;
  id: number;
  name: string;
  price: number;
  images: Array<string>;
  title: string;
};

const LatestProducts = () => {
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const data = await GetProducts();
      setProducts(data?.slice(0, 20));
    };
    fetchProducts();
  }, []);

  return (
    <div className="px-4">
      <Swiper
        slidesPerView={2}
        slidesPerGroup={2}
        spaceBetween={20}
        navigation
        modules={[Navigation]}
        breakpoints={{
          320: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 10 },
          640: { slidesPerView: 3, slidesPerGroup: 2, spaceBetween: 15 },
          1024: { slidesPerView: 6, slidesPerGroup: 2, spaceBetween: 20 },
        }}
        className="mySwiper"
      >
        {products
          .map((product, index) => (
            <SwiperSlide key={product._id}>
              <ProductCard product={product} />
              {products[index + 1] && (
                <ProductCard product={products[index + 1]} />
              )}
            </SwiperSlide>
          ))
          .slice(0, 10)}
      </Swiper>
    </div>
  );
};

export default LatestProducts;
