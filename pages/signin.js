import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/signin.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import LoginInput from "../components/shared/inputs/login-input";
import CircleIconBtn from "../components/shared/buttons/circle-icon-btn";
import { getProviders, signIn } from "next-auth/react";

//setting up initial value for the user, We are going to pass them as a initial value in the hook for the user
const initialValues = {
  login_email: "",
  login_password: "",
};

export default function Signin({ providers }) {
  // TODO - change the static values for the country in the Header and the Footer
  const [user, setUser] = useState(initialValues);
  //destructuring below for ease of access
  const { login_email, login_password } = user;

  //here we are going to declare our login validation
  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email address is required")
      .email("Please enter a valid email address"),
    login_password: Yup.string().required("Please enter a password"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target; //we are going to grab the name and fill it with the value that the user is going to type in
    setUser({ ...user, [name]: value }); //here we are leaving the user as it is but are changing the name to the value the user is providing.
  };
  console.log(providers);
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
            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_password,
              }}
              validationSchema={loginValidation}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text" //tht property will be passed through formik to the child (LoginInput) and set the value of type automatically
                    name="login_email" //that will be set with the initial value
                    placeholder="Email Address"
                    icon="email" //that controls the icon that displays in the input
                    onChange={handleChange}
                  ></LoginInput>
                  <LoginInput
                    type="password" //tht property will be passed through formik to the child (LoginInput) and set the value of type automatically
                    name="login_password" //that will be set with the initial value
                    placeholder="Password"
                    icon="password" //that controls the icon that displays in the input
                    onChange={handleChange}
                  ></LoginInput>
                  <CircleIconBtn type="submit" text="Sign in"></CircleIconBtn>
                  <div className={styles.forgot}>
                    <Link href="/forget">Forgot password?</Link>
                  </div>
                </Form>
              )}
            </Formik>

            <div className={styles.login_socials}>
              <span className={styles.or}>Or continue with</span>
              {providers.map((provider) => (
                <div key={provider.name}>
                  <button
                    className={styles.social_btn}
                    onClick={() => signIn(provider.id)}
                  >
                    Sign in with {provider.name}
                  </button>
                </div>
              ))}
            </div>

            {/* <div className={styles.relative}>
              <div className={styles.line}></div>
              <span className={styles.continue}>Or continue with</span>
            </div>

            {providers.map((provider) => (
              <div key={provider.id} className={styles.provider_container}>
                <div className={styles.provider_wrapper}>
                  <span className={styles.provider_wrapper_icon}>
                    <img
                      src={`/icons/${provider.name}.png`}
                      alt="provider-icon"
                    />
                  </span>
                  <h3>Sign in with {provider.name}</h3>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </div>
      <Footer country="UK"></Footer>
    </>
  );
}

//here we want to map through our nextauth providers that are in the array in our api endpoint. We want to make the properties on the back end endpoint available at the front of our application
export async function getServerSideProps(context) {
  const providers = Object.values(await getProviders()); //this is how you change the object to an array Object.values()
  return {
    props: { providers }, //always remember to return when doing getSeverSideProps
  }; //now we can extract it in the component at the top in the props {providers}
}
