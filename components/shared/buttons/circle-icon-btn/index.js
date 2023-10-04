import { BiRightArrowAlt } from "react-icons/bi";
import styles from "./styles.module.scss";

export default function CircleIconBtn({ type, text, icon }) {
  return (
    <button type={type} className={styles.button}>
      {text}
      <div className={styles.svg_wrap}>
        <BiRightArrowAlt></BiRightArrowAlt>
      </div>
    </button>
  );
}
