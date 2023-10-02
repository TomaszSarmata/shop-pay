import styles from "./styles.module.scss";
import { BiUser } from "react-icons/bi";
import { IoKeyOutline } from "react-icons/io5";
import { SiMinutemailer } from "react-icons/si";

export default function LoginInput({ icon, placeholder }) {
  return (
    <div className={styles.input}>
      {icon == "user" ? (
        <BiUser></BiUser>
      ) : icon == "email" ? (
        <SiMinutemailer></SiMinutemailer>
      ) : icon == "password" ? (
        <IoKeyOutline></IoKeyOutline>
      ) : (
        ""
      )}
      <input type="text" placeholder={placeholder} />
    </div>
  );
}
