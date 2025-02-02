import Categories from "@/components/client-components/categories-swiper/categories";
import FeaturedProducts from "@/components/client-components/featured-products/featured-products";
import HeaderSwiper from "@/components/client-components/HeaderSwiper/swiper";
import MensFashion from "@/components/client-components/mega-menu/mens-fashion";
import React from "react";

const Home = () => {
  return (
    <React.Fragment>
      <HeaderSwiper />
      <div className="container mx-auto">
        <Categories />
        <FeaturedProducts />
        <MensFashion />
      </div>
    </React.Fragment>
  );
};

export default Home;
