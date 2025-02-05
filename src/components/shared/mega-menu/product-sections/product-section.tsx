import GetProducts from "@/lib/get_products";
import React, { Key } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ProductCard from "../../product-card/product-card";
import { Navigation, Pagination } from "swiper/modules";

interface SubCategory {
  label: string;
  name: string;
  price: number;
  title: string;
}

const ProductSection: React.FC<{ subCategory: SubCategory }> = ({
  subCategory,
}) => {
  console.log(subCategory.label);

  interface Product {
    _id: Key | null | undefined;
    id: number;
    name: string;
    price: number;
    image: string;
    title: string;
  }

  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    const fetchSubCategoryProducts = async () => {
      const data = await GetProducts(subCategory.label);
      setProducts(data);
    };
    fetchSubCategoryProducts();
  }, [subCategory.label]);

  console.log(products);

  return (
    <React.Fragment>
      <div>
        <Swiper
          slidesPerView={4} // Default for larger screens
          spaceBetween={-10}
          pagination={{ clickable: true }}
          navigation={true}
          // Enable navigation
          modules={[Navigation, Pagination]}
          className="mySwiper"
          grid={{ rows: 2 }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 }, // Extra small screens
            640: { slidesPerView: 2, spaceBetween: 20 }, // Small devices
            1024: { slidesPerView: 3, spaceBetween: -10 }, // Larger devices
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </React.Fragment>
  );
};

export default ProductSection;
