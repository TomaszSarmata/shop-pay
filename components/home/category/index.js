import styles from "./styles.module.scss";
import { BsArrowRightCircle } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";
export default function Category({ header, products, background }) {
  const isMedium = useMediaQuery({ query: "(max-width: 1400px)" });
  return (
    <div className={styles.category} style={{ background: `${background}` }}>
      <div className={styles.category_header}>
        <h1>{header}</h1>
        <BsArrowRightCircle></BsArrowRightCircle>
      </div>
      <div className={styles.category_products}>
        {products.slice(0, isMedium ? 4 : 6).map((product, i) => (
          <div key={i} className={styles.product}>
            <img src={product.image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
