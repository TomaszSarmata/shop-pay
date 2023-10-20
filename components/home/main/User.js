import styles from "./styles.module.scss";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { AiOutlineMessage } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import { HiOutlineClipboardList } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { userSwiperArray } from "../../../data/home";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards, Navigation } from "swiper/modules";

export default function User() {
  const { data: session } = useSession();
  return (
    <div className={styles.user}>
      <img src="../../../images/userHeader.jpg" alt="" />
      <div className={styles.user_container}>
        {session ? (
          <div className={styles.user_infos}>
            <img src={session.user?.image} alt="" />
            <h4>{session.user.name}</h4>
          </div>
        ) : (
          <div className={styles.user_infos}>
            <img
              src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png"
              alt=""
            />
            <div className={styles.user_infos_btns}>
              <button>Register</button>
              <button>Login</button>
            </div>
          </div>
        )}
        <ul className={styles.user_links}>
          <li>
            <Link href="/profile" legacyBehavior>
              <IoSettingsOutline />
            </Link>
          </li>
          <li>
            <Link href="" legacyBehavior>
              <HiOutlineClipboardList />
            </Link>
          </li>
          <li>
            <Link href="" legacyBehavior>
              <AiOutlineMessage />
            </Link>
          </li>
          <li>
            <Link href="" legacyBehavior>
              <BsHeart />
            </Link>
          </li>
        </ul>
        <div className={styles.user_swiper}>
          <Swiper
            effect={"cards"}
            grabCursor={true}
            navigation={true}
            modules={[EffectCards, Navigation]}
            className="userMenu_swiper"
            style={{
              maxWidth: "180px",
              height: "240px",
              marginTop: "2rem",
            }}
          >
            {userSwiperArray.map((item, index) => (
              <SwiperSlide key={index}>
                <Link href="">
                  <img src={item.image} alt="" />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
