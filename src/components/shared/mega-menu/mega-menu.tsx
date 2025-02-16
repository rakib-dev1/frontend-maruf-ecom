import { Separator } from "@/components/ui/separator";
import React from "react";
import HighLightSwiper from "../highlight-swiper/highlight-swiper";
import ProductSection from "./product-sections/product-section";

interface MegaMenuProps {
  fashion: string;
  subFashion: Array<{
    _id: string;
    label: string;
    name: string;
    price: number;
    title: string;
  }>;
  highlight: Array<{
    image: string;
    title: string;
    _id: string;
    label: React.ReactNode;
  }>;
}

const MegaMenu: React.FC<MegaMenuProps> = ({
  fashion,
  subFashion,
  highlight,
}) => {
  const [selectedSubCategory, setSelectedSubCategory] =
    React.useState<MegaMenuProps["subFashion"][0] | null>(null);

  React.useEffect(() => {
    if (subFashion.length > 0) {
      setSelectedSubCategory(subFashion[3]); // Default to first sub-category
    }
  }, [subFashion]);
  console.log(subFashion, selectedSubCategory);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 mt-5 border-2 border-t-[#EF6322]">
      {/* First div (1/5 width on medium screens) */}
      <div className="col-span-1 text-center ">
        <h2 className="text-2xl font-bold p-3">{fashion}</h2>
        <Separator />
        <ul className="flex justify-center items-center lg:block lg:text-center lg:mx-auto">
          {subFashion.map((sub, index) => (
            <li className="text-center mr-5 my-3" key={index}>
              <button
                onClick={() => setSelectedSubCategory(sub)}
                className="text-blue-500 hover:underline"
              >
                {sub.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Second div (2/5 width on medium screens) */}
      <div className="hidden lg:block col-span-2">
        <HighLightSwiper hImg={highlight} />
      </div>

      {/* Third div (3/5 width on medium screens) */}
      <div className="col-span-3 ">
        {selectedSubCategory && (
          <ProductSection subCategory={selectedSubCategory} />
        )}
      </div>
    </div>
  );
};

export default MegaMenu;
