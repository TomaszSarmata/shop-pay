import { MdFlashOn } from "react-icons/md";
import styles from "./styles.module.scss";
import Countdown from "../../../components/countdown";
export default function FlashDeals() {
  return (
    <div className={styles.flashDeals}>
      <div className={styles.flashDeals_header}>
        <h1>
          FLASH SALE
          <MdFlashOn></MdFlashOn>
        </h1>
        <Countdown></Countdown>
      </div>
    </div>
  );
}
