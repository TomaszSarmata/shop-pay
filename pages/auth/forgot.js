import styles from "../../styles/forgot.module.scss";
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function forgot() {
  return (
    <>
      <Header country="UK"></Header>
      <div className={styles.forgot}></div>
      <Footer country="UK"></Footer>
    </>
  );
}
