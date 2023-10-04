import styles from "./styles.module.scss";

export default function CircleIconBtn({ type, text, icon }) {
  return <button type={type}>{text}</button>;
}
