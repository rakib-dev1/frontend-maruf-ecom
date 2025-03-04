import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
type HightLightImgSwiperProps = {
  imgURL: { image: string | StaticImport }[];
};
const HightLightImgSwiper = ({ imgURL }: HightLightImgSwiperProps) => {
  console.log(imgURL);
  return (
    <React.Fragment>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {imgURL.map(
          (
            img: { image: string | StaticImport },
            index: React.Key | null | undefined
          ) => (
            <SwiperSlide key={index}>
              <Image
                src={img.image}
                alt="Picture of the author"
                width={500}
                height={500}
              />
            </SwiperSlide>
          )
        )}
      </Swiper>
    </React.Fragment>
  );
};

export default HightLightImgSwiper;
