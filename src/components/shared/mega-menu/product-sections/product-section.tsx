import GetProducts from "@/lib/get_products";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import required modules
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface SubCategory {
  label: string;
  name: string;
  price: number;
}

const ProductSection: React.FC<{ subCategory: SubCategory }> = ({
  subCategory,
}) => {
  console.log(subCategory.label);

  interface Product {
    _id: string;
    title: string;
    price: number;
    image: string;
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
      <h1>Product Category: {products.length}</h1>
      <div>
        <Swiper
          slidesPerView={3} // Default for larger screens
          spaceBetween={30}
          pagination={{ clickable: true }}
          navigation={true} // Enable navigation
          modules={[Pagination, Navigation]} // Include Navigation module
          className="mySwiper"
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 }, // Extra small screens
            640: { slidesPerView: 2, spaceBetween: 20 }, // Small devices
            1024: { slidesPerView: 3, spaceBetween: 30 }, // Larger devices
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <div className="w-52 bg-white shadow-md rounded-lg overflow-hidden group">
                <div className="relative h-48">
                  <Image
                    height={200}
                    width={200}
                    src={product.image}
                    style={{ width: "auto", height: "auto" }}
                    alt={product.title}
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="secondary" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 font-medium">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </React.Fragment>
  );
};

export default ProductSection;
