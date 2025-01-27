import Categories from "@/components/client-components/categories-swiper/categories";
import FeaturedProducts from "@/components/client-components/featured-products/featured-products";
import Swiper from "@/components/client-components/swiper/swiper";

const Home = () => {
  return (
    <div>
      <Swiper />
      <Categories />
      <FeaturedProducts />
    </div>
  );
};

export default Home;
