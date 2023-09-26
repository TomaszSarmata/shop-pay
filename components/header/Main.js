import { RiSearch2Line } from "react-icons/ri";

import { FaOpencart } from "react-icons/fa";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useSelector } from "react-redux";
export default function Main() {
  const { cart } = useSelector((state) => ({ ...state })); //here we are pulling out the value of the cart from react-redux and we are going to use cart.length (as its a array) to display the number of products in the cart
  console.log("here", cart.length);
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
            <RiSearch2Line />
          </div>
        </div>

        <Link legacyBehavior href="/cart">
          <a className={styles.cart}>
            <FaOpencart className={styles.react_icon} />
            <span>{cart.length}</span>
          </a>
        </Link>
      </div>
    </div>
  );
}
