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
import axios from "axios";
import DotsLoader from "../components/shared/loaders/dot-loader";

//setting up initial value for the user, We are going to pass them as a initial value in the hook for the user
const initialValues = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  conf_password: "",
  success: "",
  error: "",
};

export default function Signin({ providers }) {
  const [loadingState, setLoadingState] = useState(false);
  // TODO - change the static values for the country in the Header and the Footer
  const [user, setUser] = useState(initialValues);
  //destructuring below for ease of access
  const {
    login_email,
    login_password,
    name,
    email,
    password,
    conf_password,
    success,
    error,
  } = user;

  //here we are going to declare our login validation
  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email address is required")
      .email("Please enter a valid email address"),
    login_password: Yup.string().required("Please enter a password"),
  });

  const registerValidation = Yup.object({
    name: Yup.string()
      .required("Full Name is required")
      .min(2, "First name must be between 2 and 16 characters")
      .max(16, "First name must be between 2 and 16 characters")
      .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed"),
    email: Yup.string()
      .required("Email address is required")
      .email("Please enter a valid email address"),
    password: Yup.string()
      .required(
        "Shuld be a combination of six numbers or letters. Must include at least one special character (i.e. ! or &)"
      )
      .min(6, "Password must be at least 6 characters long")
      .max(36, "Password must be less than 36 characters long"),
    conf_password: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target; //we are going to grab the name and fill it with the value that the user is going to type in
    setUser({ ...user, [name]: value }); //here we are leaving the user as it is but are changing the name to the value the user is providing.
  };
  const signUpHandler = async () => {
    try {
      setLoadingState(true); //that will show loading state during fetching

      const { data } = await axios.post("./api/auth/signup", {
        name,
        email,
        password,
      }); //here we are hitting the endpoint handling the signup to provide the info from the input fields for the api to handle the registration.

      setUser({ ...user, error: "", success: data.message }); //in case we would need any info from the endpint. If its successfull we gonna show it  to the user.
      setLoadingState(false); //that will take off loading state on completion of fetching
    } catch (error) {
      setLoadingState(false); //as you want to display the error message
      console.log("here error", error);
      setUser({ ...user, success: "", error: error.response.data.message }); //so this error comes from catch error in this try catch statement, response is just an object on it, and than we have further object called data and then message that come from our signup.js from try catch statement in there. So effectively we are passing the error message between the components and setting the message to the error message we are getting in child component
    }
  };

  return (
    <>
      <Header country="UK"></Header>
      {loadingState && <DotsLoader></DotsLoader>}

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
              <div className={styles.login_socials_wrap}>
                {providers.map((provider) => (
                  <div key={provider.name}>
                    <button
                      className={styles.social_btn}
                      onClick={() => signIn(provider.id)}
                    >
                      <img src={`icons/${provider.name}.png`} alt="" />
                      Sign in with {provider.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.login_container}>
          <div className={styles.login_form}>
            <h1>Sign up</h1>
            <p>Get access to the most sophisticated E-shopping experiance!</p>
            <Formik
              enableReinitialize
              initialValues={{
                name,
                email,
                password,
                conf_password,
              }}
              validationSchema={registerValidation}
              onSubmit={() => {
                signUpHandler();
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    icon="user"
                    onChange={handleChange}
                  ></LoginInput>
                  <LoginInput
                    type="text"
                    name="email"
                    placeholder="Email Address"
                    icon="email"
                    onChange={handleChange}
                  ></LoginInput>
                  <LoginInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    icon="password"
                    onChange={handleChange}
                  ></LoginInput>
                  <LoginInput
                    type="password"
                    name="conf_password"
                    placeholder="Re-type Password"
                    icon="password"
                    onChange={handleChange}
                  ></LoginInput>
                  <CircleIconBtn type="submit" text="Sign up"></CircleIconBtn>
                </Form>
              )}
            </Formik>
            <div className={styles.seccess}>
              {success && <span>{success}</span>}
            </div>
            <div className={styles.error}>{error && <span>{error}</span>}</div>
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
