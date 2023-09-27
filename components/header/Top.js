import styles from "./styles.module.scss";
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./UserMenu";

export default function Top({ country }) {
  const [loggedIn, setLoggedIn] = useState(true);
  const [visible, setVisible] = useState(false);

  console.log(country.flag.emoji);
  return (
    <div className={styles.top}>
      <div className={styles.top_container}>
        <div></div>
        <ul className={styles.top_list}>
          <li className={styles.li}>
            <img src={country.flag.emojitwo} alt="country flag" />
            <span>
              {country.name} / {country.code}
            </span>
          </li>
          <li className={styles.li}>
            <MdSecurity />

            <span>Buyer Protection</span>
          </li>
          <li className={styles.li}>
            <span>Customer Service</span>
          </li>
          <li className={styles.li}>
            <span>Help</span>
          </li>
          <li className={styles.li}>
            <BsSuitHeart />
            <Link href="/profile/whishlist">
              <span>Whishlist</span>
            </Link>
          </li>
          <li
            className={styles.li}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            {loggedIn ? (
              <ul>
                <li className={styles.li}>
                  <div className={styles.flex}>
                    <img
                      src="https://www.seekpng.com/png/detail/115-1150622_avatar-demo2x-man-avatar-icon-png.png"
                      alt="avatar"
                    />
                    <span>Tomasz</span>
                    <RiArrowDropDownFill />
                  </div>
                </li>
              </ul>
            ) : (
              <ul>
                <li className={styles.li}>
                  <div className={styles.flex}>
                    <RiAccountPinCircleLine />
                    <span>Account</span>
                    <RiArrowDropDownFill />
                  </div>
                </li>
              </ul>
            )}
            {visible && <UserMenu loggedIn={loggedIn}></UserMenu>}
          </li>
        </ul>
      </div>
    </div>
  );
}
