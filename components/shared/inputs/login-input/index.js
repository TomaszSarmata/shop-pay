import styles from "./styles.module.scss";
import { BiUser } from "react-icons/bi";
import { IoKeyOutline } from "react-icons/io5";
import { SiMinutemailer } from "react-icons/si";
import { ErrorMessage, useField } from "formik";

export default function LoginInput({ icon, placeholder, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div
      className={`${styles.input} ${
        meta.touched && meta.error ? styles.error : ""
      }`}
    >
      {icon == "user" ? (
        <BiUser></BiUser>
      ) : icon == "email" ? (
        <SiMinutemailer></SiMinutemailer>
      ) : icon == "password" ? (
        <IoKeyOutline></IoKeyOutline>
      ) : (
        ""
      )}
      <input
        type={field.type}
        placeholder={placeholder}
        name={field.name}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <div className={styles.error_popup}>
          <span></span>
          <ErrorMessage name={field.name}></ErrorMessage>
        </div>
      )}
    </div>
  );
}
