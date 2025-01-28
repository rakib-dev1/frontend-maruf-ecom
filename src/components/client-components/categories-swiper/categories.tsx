"use client";
import AxiosPublic from "@/services/axios-public";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import React from "react";
import "./styles.css";
import Link from "next/link";
interface Category {
  icon: string;
  label: string;
  href: string;
}
const Categories = () => {
  const axiosPublic = AxiosPublic();
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: false,
    mode: "free-snap",
    slides: {
      perView: "auto",
      spacing: 15,
    },
  });

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
  }, [axiosPublic]);
  return (
    <>
      <div ref={ref} className="keen-slider">
        {categories.map((category, index) => (
          <Link
            href={category.href}
            key={index}
            className="keen-slider__slide  flex flex-col items-center p-2   group transition-transform duration-300 hover:scale-105 hover:text-[#EF6322] mouse-pointer"
          >
            <Image
              className=" border-red-600 border   rounded-full p-1 group-hover:scale-110 transition-transform duration-300"
              src={category.icon}
              alt={category.label}
              width={100}
              height={100}
              priority
            />
            <p className="mt-2">{category.label}</p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Categories;
