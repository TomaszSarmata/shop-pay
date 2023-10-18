import styles from "./styles.module.scss";
import { offersAarray } from "../../../data/home";
import Link from "next/link";

import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Navigation, Pagination } from "swiper/modules";

export default function Offers() {
  return (
    <div className={styles.offers}>
      <div className={styles.offers_swiper_container}>
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination, Navigation]}
          navigation={true}
          className="offers_swiper"
        >
          {offersAarray.map((offer, i) => (
            <SwiperSlide key={i}>
              <Link href="">
                <img src={offer.image} alt="" />
              </Link>
              <span>${offer.price}</span>
              <span>-{offer.discount}%</span>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
