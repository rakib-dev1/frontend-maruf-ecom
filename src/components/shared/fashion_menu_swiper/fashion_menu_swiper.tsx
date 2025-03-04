import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import { ProductModel } from "@/models/mega-fashions";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import ProductCard from "../product-card/product-card";
const FashionMenuSwiper = ({ products }: { products: ProductModel[] }) => {
  return (
    <React.Fragment>
      <Swiper
        slidesPerView={2}
        slidesPerGroup={2}
        spaceBetween={20}
        navigation
        modules={[Navigation]}
        breakpoints={{
          320: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 10 },
          640: { slidesPerView: 3, slidesPerGroup: 2, spaceBetween: 15 },
          1024: { slidesPerView: 3, slidesPerGroup: 2, spaceBetween: 20 },
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
    </React.Fragment>
  );
};

export default FashionMenuSwiper;
