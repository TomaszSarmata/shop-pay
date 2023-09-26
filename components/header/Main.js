import { RiSearch2Line } from "react-icons/ri";

import { FaOpencart } from "react-icons/fa";
import styles from "./styles.module.scss";
import Link from "next/link";
export default function Main() {
  return (
    <div className={styles.main}>
      <div className={styles.main_container}>
        <Link legacyBehavior href="/">
          <a className={styles.logo}>
            <img src="/logo.png" alt="logo" />
          </a>
        </Link>
        <div className={styles.search}>
          <input type="text" placeholder="Search..." />
          <div className={styles.search_icon}>
            <RiSearch2Line className={styles.react_icon} />
          </div>
        </div>

        <Link legacyBehavior href="/cart">
          <a className="styles.cart">
            <FaOpencart className={styles.react_icon} />
          </a>
        </Link>
      </div>
    </div>
  );
}
