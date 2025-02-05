"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import Image from "next/image";
interface ImageType {
  _id: string;
  image: string;
  title: string;
}

const HighLightSwiper = ({ hImg }: { hImg: ImageType[] }) => {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <div>
          {hImg.map((img) => (
            <SwiperSlide key={img._id}>
              <Image
                className="w-full h-[540px] "
                priority
                src={img.image}
                alt={img.title}
                width={300}
                height={200}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </>
  );
};

export default HighLightSwiper;
