import { MdFlashOn } from "react-icons/md";
import styles from "./styles.module.scss";
import Countdown from "../../../components/countdown";
import { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { flashDealsArray } from "../../../data/home";

// import required modules
import { Navigation } from "swiper/modules";
import FlashCard from "./FlashCard";

export default function FlashDeals() {
  // const [slidesPerView, setSlidesPerView] = useState(5);

  // useEffect(() => {
  //   function updateSlidesPerView() {
  //     if (window.innerWidth >= 1200) {
  //       setSlidesPerView(5);
  //     } else if (window.innerWidth >= 1000) {
  //       setSlidesPerView(4);
  //     } else if (window.innerWidth >= 700) {
  //       setSlidesPerView(3);
  //     } else if (window.innerWidth >= 600) {
  //       setSlidesPerView(2);
  //     } else {
  //       setSlidesPerView(1);
  //     }
  //   }

  //   updateSlidesPerView();

  //   window.addEventListener("resize", updateSlidesPerView);

  //   return () => {
  //     window.removeEventListener("resize", updateSlidesPerView);
  //   };
  // }, []);

  return (
    <div className={styles.flashDeals}>
      <div className={styles.flashDeals_header}>
        <h1>
          FLASH SALE
          <MdFlashOn></MdFlashOn>
        </h1>
        <Countdown></Countdown>
      </div>
      <Swiper
        slidesPerView={1} //{slidesPerView} that was with the useEffect
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="flashDeals_swiper"
        breakpoints={{
          500: {
            slidesPerView: 2,
          },
          700: {
            slidesPerView: 3,
          },
          900: {
            slidesPerView: 4,
          },
          1100: {
            slidesPerView: 5,
          },
        }}
      >
        <div className={styles.flashDeals_list}>
          {flashDealsArray.map((product, index) => (
            <SwiperSlide key={index}>
              <FlashCard product={product}></FlashCard>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}
