import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import HighLightSwiper from "../highlight-swiper/highlight-swiper";

interface MegaMenuProps {
  fashion: string;
  subFashion: Array<{
    _id: string;
    label: React.ReactNode;
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
  return (
    <div className="grid grid-cols-3 gap-4 border-t-2 mt-5">
      <div>
        <h2 className="text-3xl font-bold">{fashion}</h2>
        <Separator />
        <ul>
          {subFashion.map((sub, index) => (
            <li key={index}>
              <Link href="/">{sub.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <HighLightSwiper hImg={highlight} />
      </div>
      <div>
        <h2>Category 3</h2>
        <ul>
          <li>Subcategory 1</li>
          <li>Subcategory 2</li>
          <li>Subcategory 3</li>
          <li>Subcategory 4</li>
        </ul>
      </div>
    </div>
  );
};

export default MegaMenu;
