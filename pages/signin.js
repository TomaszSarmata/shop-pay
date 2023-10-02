import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/signin.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Formik, Form } from "formik";
import LoginInput from "../components/shared/inputs/login-input";

export default function signin() {
  // TODO - change the static values for the country in the Header and the Footer
  return (
    <>
      <Header country="UK"></Header>
      <div className={styles.login}>
        <div className={styles.login_container}>
          <div className={styles.login_header}>
            <div className={styles.back_svg}>
              <BiLeftArrowAlt></BiLeftArrowAlt>
            </div>
            <span>
              We'd be happy to join us! <Link href="/">Go Store</Link>{" "}
            </span>
          </div>
          <div className={styles.login_form}>
            <h1>Sign in</h1>
            <p>Get access to the most sophisticated E-shopping experiance!</p>
            <Formik>
              {(form) => (
                <Form>
                  <LoginInput icon="email"></LoginInput>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Footer country="UK"></Footer>
    </>
  );
}
