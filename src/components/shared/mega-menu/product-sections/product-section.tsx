import FeaturedProductSwiper from "@/components/client-components/featured-products/featured-products-swiper/featured-products-swiper";
import GetProducts from "@/lib/get_products";
import React from "react";

interface SubCategory {
  label: string;
  name: string;
  price: number;
}

const ProductSection: React.FC<{ subCategory: SubCategory }> = ({
  subCategory,
}) => {
  console.log(subCategory.label);
  const [products, setProducts] = React.useState([]);
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
      <h1>Product Category:</h1>
      <FeaturedProductSwiper products={products} />
    </React.Fragment>
  );
};

export default ProductSection;
