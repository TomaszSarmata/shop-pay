import styles from "./styles.module.scss";
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./UserMenu";
import { useSession } from "next-auth/react";

export default function Top({ country }) {
  const { data: session } = useSession();
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.top}>
      <div className={styles.top_container}>
        <div></div>
        <ul className={styles.top_list}>
          <li className={styles.li}>
            <img src={country.flag} alt="country flag" />
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
            {session ? (
              <ul>
                <li className={styles.li}>
                  <div className={styles.flex}>
                    <img src={session.user.image} alt="avatar" />
                    <span>{session.user.name}</span>
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
            {visible && <UserMenu loggedIn={session}></UserMenu>}
          </li>
        </ul>
      </div>
    </div>
  );
}
