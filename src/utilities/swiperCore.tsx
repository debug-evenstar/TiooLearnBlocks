import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Autoplay, EffectFade } from "swiper";

// Import Swiper styles
// import "swiper/swiper.min.css"
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

interface Props {
  items: JSX.Element[];
  [key: string]: any;
}

const SwiperCore: React.FC<Props> = ({ items, ...rest }) => {
  return (
    <>
      <Swiper
        modules={[FreeMode, Navigation, Pagination, Autoplay, EffectFade]}
        {...rest}
      >
        {items &&
          items.map((item, index) => (
            <SwiperSlide key={index} virtualIndex={index}>
              {item}
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default SwiperCore;
