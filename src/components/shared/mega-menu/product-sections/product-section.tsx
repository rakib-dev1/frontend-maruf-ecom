import GetProducts from "@/lib/get_products";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import ProductCard from "../../product-card/product-card";
interface Product {
  _id: string;
  id: number;
  name: string;
  price: number;
  images: Array<string>;
  title: string;
}
interface SubCategory {
  label: string;
  name: string;
  price: number;
  title: string;
}

const ProductSection: React.FC<{ subCategory: SubCategory }> = ({
  subCategory,
}) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  React.useEffect(() => {
    const fetchSubCategoryProducts = async () => {
      const data = await GetProducts();
      setProducts(data);
    };
    fetchSubCategoryProducts();
  }, [subCategory.label]);
  return (
    <React.Fragment>
      <Swiper
        slidesPerView={2} // Default for larger screens
        spaceBetween={-10}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Navigation, Pagination]}
        grid={{ rows: 2, fill: "row" }} // Display 2 rows
        className="mySwiper"
        breakpoints={{
          // When the screen width is 768px or less (for small devices)
          768: {
            slidesPerView: 2, // Show 2 slides per row
            grid: {
              rows: 2, // 2 rows
              fill: "row", // Wrap items into rows
            },
          },
          // When the screen width is 1024px or less (for medium devices)
          1024: {
            slidesPerView: 3, // Show 3 slides per row
            grid: {
              rows: 2, // 2 rows
              fill: "row", // Wrap items into rows
            },
          },
        }}
      >
        <div>
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </React.Fragment>
  );
};

export default ProductSection;
