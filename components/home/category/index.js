import styles from "./styles.module.scss";
import { BsArrowRightCircle } from "react-icons/bs";
export default function Category({ header, products }) {
  return (
    <div className={styles.category}>
      <div className={styles.category_header}>
        <h1>{header}</h1>
        <BsArrowRightCircle></BsArrowRightCircle>
      </div>
      <div className={styles.category_products}></div>
    </div>
  );
}
