import styles from "./styles.module.scss";
import { BsArrowRightCircle } from "react-icons/bs";
export default function Category({ header, products, background }) {
  return (
    <div className={styles.category} style={{ background: `${background}` }}>
      <div className={styles.category_header}>
        <h1>{header}</h1>
        <BsArrowRightCircle></BsArrowRightCircle>
      </div>
      <div className={styles.category_products}>
        {products.map((product, i) => (
          <img key={i} src={product.image} alt="" />
        ))}
      </div>
    </div>
  );
}
