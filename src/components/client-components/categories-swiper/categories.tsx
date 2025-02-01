"use client";
import AxiosPublic from "@/services/axios-public";
import Image from "next/image";
import Link from "next/link";
import React from "react";
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
const Categories = () => {
  const axiosPublic = AxiosPublic();
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [slidesPerView, setSlidesPerView] = React.useState(5);
  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosPublic.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
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
  }, [axiosPublic]);

  return (
    <div className="mt-5">
      <Swiper
        slidesPerView={slidesPerView}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {categories.map((category) => (
          <SwiperSlide className="px-10" key={category._id}>
            <Link className="hover:font-semibold" href={category.href}>
              <div className="border   rounded-full w-20 p-2 overflow-hidden">
                <Image
                  className="rounded-full w-40 transition-transform duration-300 ease-in-out transform hover:scale-150"
                  width={40}
                  priority
                  height={0}
                  src={category.icon}
                  alt={category.label}
                />
              </div>

              <p className="text-nowrap ">{category.label.slice(0, 8)}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Categories;
