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
  const [selectedSubCategory, setSelectedSubCategory] = React.useState<
    MegaMenuProps["subFashion"][0] | null
  >(null);
  React.useEffect(() => {
    if (subFashion.length > 0) {
      setSelectedSubCategory(subFashion[0]); // Default to first sub-category
    }
  }, [subFashion]);

  return (
    <div className="grid grid-cols-6 gap-4 mt-5">
      {/* First div (1/5 width on medium screens) */}
      <div className="col-span-1">
        <h2 className="text-3xl font-bold">{fashion}</h2>
        <Separator />
        <ul>
          {subFashion.map((sub, index) => (
            <li key={index}>
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
      <div className="hidden md:block col-span-2 ">
        <HighLightSwiper hImg={highlight} />
      </div>

      {/* Third div (3/5 width on medium screens) */}
      <div className="col-span-3">
        {selectedSubCategory && (
          <ProductSection subCategory={selectedSubCategory} />
        )}
      </div>
    </div>
  );
};

export default MegaMenu;
