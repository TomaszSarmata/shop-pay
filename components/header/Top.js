import styles from "./styles.module.scss";
import { MdOutlineSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";

export default function Top() {
  return (
    <div className={styles.top}>
      <div className={styles.top_container}>
        <div></div>
        <ul className="styles top_list">
          <li>
            <img
              src="https://www.seekpng.com/png/full/422-4223726_peta-negara-polandia-poland-map-flag-png.png"
              alt="polish flag"
            />
            <span>Poland / pln</span>
          </li>
          <li>
            <MdOutlineSecurity />

            <span>Buyer Protection</span>
          </li>
          <li>
            <span>Customer Service</span>
          </li>
          <li>
            <span>Help</span>
          </li>
          <li>
            <BsSuitHeart />
            <span>Whishlist</span>
          </li>
          <li>
            <div className={styles.flex}>
              <RiAccountPinCircleLine />
              <span>Account</span>
              <RiArrowDropDownFill />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
