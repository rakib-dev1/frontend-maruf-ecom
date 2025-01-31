"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import img1 from "@/assets/swiper-img/slider2.webp";
import img2 from "@/assets/swiper-img/slider1.webp";
import Image from "next/image";
const HeaderSwiper = () => {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          <Image
            priority
            src={img1}
            alt="Picture of the author"
            width={0}
            height={0}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            priority
            src={img2}
            alt="Picture of the author"
            width={0}
            height={0}
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default HeaderSwiper;
