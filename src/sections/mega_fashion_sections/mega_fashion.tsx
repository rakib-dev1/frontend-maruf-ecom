"use client";
import FashionMenuSwiper from "@/components/shared/fashion_menu_swiper/fashion_menu_swiper";
import HightLightImgSwiper from "@/components/shared/highlight-img-swiper/highlight-img-swiper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import GetCategories from "@/lib/get_categories";
import GetHightLights from "@/lib/get_highlights";
import GetProducts from "@/lib/get_products";
import { MegaFashionModel } from "@/models/mega-fashions";
import React from "react";

const MegaFashions = ({ fashionCategories, highLight }: MegaFashionModel) => {
  const [products, setProducts] = React.useState([]);
  const [categories] = React.useState(fashionCategories);
  const [highLights, setHighLight] = React.useState([]);
  const [subCategories, setSubCategories] = React.useState<{ label: string }[]>(
    []
  );

  const [selectedSubCategory, setSelectedSubCategory] = React.useState(""); // Track selected subcategory

  React.useEffect(() => {
    const fetchHighlight = async () => {
      try {
        const response = await GetHightLights({ category: highLight });
        if (response && response.length > 0) {
          setHighLight(response);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchHighlight();
  }, [highLight]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await GetCategories(fashionCategories);
        if (response && response.length > 0) {
          setSubCategories(response);
          setSelectedSubCategory(response[0]?.label || ""); // Set the first subcategory as selected
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [fashionCategories]);

  // Fetch products based on selected subcategory
  React.useEffect(() => {
    if (!selectedSubCategory) return;

    const fetchProducts = async () => {
      try {
        const response = await GetProducts(categories, selectedSubCategory);
        if (response) setProducts(response); // Set products list
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [categories, selectedSubCategory]);
  if (!products) return null;
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 lg:grid-cols-6 mt-5 border-2 border-t-[#EF6322]">
        <div className="border  p-2 col-span-1">
          <h1 className="text-center text-2xl font-semibold">
            {fashionCategories}
          </h1>
          <Separator />
          <ul className="flex justify-center items-center lg:block lg:text-center lg:mx-auto">
            {subCategories.map((category, index) => (
              <li key={index}>
                <Button
                  variant="ghost"
                  className=" cursor-pointer "
                  onClick={() => setSelectedSubCategory(category.label)}
                >
                  {category.label}
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2 hidden lg:block">
          <HightLightImgSwiper imgURL={highLights} />
        </div>
        <div className="col-span-3">
          <FashionMenuSwiper products={products} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MegaFashions;
