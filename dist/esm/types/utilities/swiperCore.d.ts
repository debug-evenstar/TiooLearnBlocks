import React from "react";
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
declare const SwiperCore: React.FC<Props>;
export default SwiperCore;
