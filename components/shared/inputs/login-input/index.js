import styles from "./styles.module.scss";
import { BiUser } from "react-icons/bi";
import { SiMinutemailer } from "react-icons/si";

export default function LoginInput({ icon }) {
  return (
    <div className={styles.input}>
      {icon == "user" ? (
        <BiUser></BiUser>
      ) : icon == "email" ? (
        <SiMinutemailer></SiMinutemailer>
      ) : (
        ""
      )}
    </div>
  );
}
