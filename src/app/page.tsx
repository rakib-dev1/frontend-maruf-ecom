import Categories from "@/components/client-components/categories-swiper/categories";
import HeaderSwiper from "@/components/client-components/HeaderSwiper/swiper";
import LatestProductsSection from "@/sections/featured_products/featured_products";
import MegaFashions from "@/sections/mega_fashion_sections/mega_fashion";
import React from "react";
const Home = () => {
  return (
    <React.Fragment>
      <HeaderSwiper />
      <div className="container mx-auto">
        <Categories />
        <LatestProductsSection />
        <MegaFashions
          fashion="Mens Shopping"
          fashionCategories="Mens Shopping"
          highLight="Mens Fashion"
        />
        <MegaFashions
          fashion="Mens Shopping"
          fashionCategories="Mens Shopping"
          highLight="Mens Fashion"
        />
        <MegaFashions
          fashion="Mens Shopping"
          fashionCategories="Mens Shopping"
          highLight="Mens Fashion"
        />
      </div>
    </React.Fragment>
  );
};

export default Home;
