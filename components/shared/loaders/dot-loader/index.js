import styles from "./styles.module.scss";
import DotLoader from "react-spinners/DotLoader";

export default function DotsLoader() {
  //if leading true then it will show up
  return (
    <div className={styles.loader}>
      <DotLoader color="#2f82ff"></DotLoader>
    </div>
  );
}
