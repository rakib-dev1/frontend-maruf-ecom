import Categories from "@/components/client-components/categories-swiper/categories";
import FeaturedProducts from "@/components/client-components/featured-products/featured-products";
import HeaderSwiper from "@/components/client-components/HeaderSwiper/swiper";

const Home = () => {
  return (
    <div>
      <HeaderSwiper />
      <div className="container mx-auto">
        <Categories />
        <FeaturedProducts />
      </div>
    </div>
  );
};

export default Home;
