"use client";

import AxiosPublic from "@/services/axios-public";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./styles.css";

interface Category {
  _id: number;
  icon: string;
  label: string;
  href: string;
}

const Categories: React.FC<{ initialCategories?: Category[] }> & {
  preload?: () => Promise<Category[]>;
} = ({ initialCategories = [] }) => {
  const axiosPublic = AxiosPublic();
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [slidesPerView, setSlidesPerView] = useState(5);

  useEffect(() => {
    if (initialCategories.length === 0) {
      const fetchCategories = async () => {
        try {
          const response = await axiosPublic.get("/categories");
          setCategories(response?.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchCategories();
    }

    const updateSlidesPerView = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(3);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(4);
      } else {
        setSlidesPerView(10);
      }
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);

    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, [initialCategories]);

  return (
    <div className="mt-5">
      <Swiper
        slidesPerView={slidesPerView}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {categories?.map((category) => (
          <SwiperSlide className="px-10" key={category?._id}>
            <Link href={category?.href || "#"} className="hover:font-semibold">
              <div className="border rounded-full w-20 p-2 overflow-hidden">
                {category?.icon && (
                  <Image
                    src={category?.icon}
                    alt={category?.label}
                    width={50}
                    height={50}
                  />
                )}
              </div>

              <p className="text-nowrap">{category?.label?.slice(0, 8)}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// ✅ Preload function for server-side fetching
Categories.preload = async () => {
  const axiosPublic = AxiosPublic();
  const response = await axiosPublic.get("/categories");
  return response?.data;
};

export default Categories;
