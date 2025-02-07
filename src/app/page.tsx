import Categories from "@/components/client-components/categories-swiper/categories";
import FeaturedProducts from "@/components/client-components/featured-products/featured-products";
import HeaderSwiper from "@/components/client-components/HeaderSwiper/swiper";
import HighLightSection from "@/components/client-components/mega-menu/mens-fashion";
import React from "react";

const Home = () => {
  return (
    <React.Fragment>
      <HeaderSwiper />
      <div className="container mx-auto">
        <Categories />
        <FeaturedProducts />
        <HighLightSection category="Mens Shopping" highlight="Mens Fashion" />
        <HighLightSection
          category="Womens Fashion"
          highlight="Womens Fashion"
        />
        <HighLightSection
          category="Fashion Categories"
          highlight="Womens Fashion"
        />
      </div>
    </React.Fragment>
  );
};

export default Home;
