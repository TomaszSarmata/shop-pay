import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/signin.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Formik, Form } from "formik";
import LoginInput from "../components/shared/inputs/login-input";

//setting up initial value for the user, We are going to pass them as a initial value in the hook for the user
const initialValues = {
  login_email: "",
  login_password: "",
};

export default function Signin() {
  // TODO - change the static values for the country in the Header and the Footer
  const [user, setUser] = useState(initialValues);
  //destructuring below for ease of access
  const { login_email, login_password } = user;

  const handleChange = (e) => {
    const { name, value } = e.target; //we are going to grab the name and fill it with the value that the user is going to type in
    setUser({ ...user, [name]: value }); //here we are leaving the user as it is but are changing the name to the value the user is providing.
  };
  console.log("user:", user);

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
              We'd be happy if you join us! <Link href="/">Go Store</Link>{" "}
            </span>
          </div>
          <div className={styles.login_form}>
            <h1>Sign in</h1>
            <p>Get access to the most sophisticated E-shopping experiance!</p>
            <Formik>
              {(form) => (
                <Form>
                  <LoginInput
                    type="text" //tht property will be passed through formik to the child (LoginInput) and set the value of type automatically
                    name="login_email" //that will be set with the initial value
                    placeholder="email"
                    icon="email" //that controls the icon that displays in the input
                    onChange={handleChange}
                  ></LoginInput>
                  <LoginInput
                    type="password" //tht property will be passed through formik to the child (LoginInput) and set the value of type automatically
                    name="login_password" //that will be set with the initial value
                    placeholder="password"
                    icon="password" //that controls the icon that displays in the input
                    onChange={handleChange}
                  ></LoginInput>
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
