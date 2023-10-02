import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/signin.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";

export default function signin() {
  return (
    <>
      <Header country="UK"></Header>
      <div className={styles.login}>
        <div className={styles.login_container}>
          <div className={styles.login_header}>
            <div className={styles.back_svg}>
              <BiLeftArrowAlt></BiLeftArrowAlt>
            </div>
          </div>
        </div>
      </div>
      <Footer country="UK"></Footer>
    </>
  );
}
