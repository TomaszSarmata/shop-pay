import styles from "../../../styles/forgot.module.scss";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import CircleIconBtn from "../../../components/shared/buttons/circle-icon-btn";
import LoginInput from "../../../components/shared/inputs/login-input";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import DotsLoader from "../../../components/shared/loaders/dot-loader";
import jwt from "jsonwebtoken";
import { signIn } from "next-auth/react";
import Router from "next/router";
import { getSession } from "next-auth/react";

export default function Reset({ user_id }) {
  console.log("user_id", user_id);
  const [password, setPassword] = useState("");
  const [conf_password, setConf_password] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const passwordValidation = Yup.object({
    password: Yup.string()
      .required("Please enter your new password.")
      .min(6, "Password must be at least 6 characters long")
      .max(36, "Password must be less than 36 characters long"),
    conf_password: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });
  const resetHandler = async () => {
    try {
      setLoadingState(true);
      setSuccess("");
      setError("");
      const { data } = await axios.put("/api/auth/reset", {
        user_id,
        password,
      }); //here we are sending the data back to the backend
      let options = {
        redirect: false,
        email: data.email, //email that we get from the backend
        password: password,
      };
      await signIn("credentials", options);
      setLoadingState(false);
      window.location.reload(true); //that piece of code will reload the page so that we get the new session and will get redirected to the homepage (look at the getServerSideProps function below)
    } catch (error) {
      console.log(error);
      setSuccess("");
      setError("");
      setLoadingState(false);
      setError(error.response.data.message);
    }
  };
  return (
    <>
      {loadingState && <DotsLoader></DotsLoader>}
      <Header country="UK"></Header>
      <div className={styles.forgot}>
        <div>
          <div className={styles.forgot_header}>
            <div className={styles.back_svg}>
              <BiLeftArrowAlt></BiLeftArrowAlt>
            </div>
            <span>
              Reset your password? <Link href="/">Login instead</Link>{" "}
            </span>
          </div>

          <Formik
            enableReinitialize
            initialValues={{
              password,
              conf_password,
            }}
            validationSchema={passwordValidation}
            onSubmit={() => {
              resetHandler();
            }}
          >
            {(form) => (
              <Form>
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  icon="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></LoginInput>
                <LoginInput
                  type="password"
                  name="conf_password"
                  placeholder="Confirm Password"
                  icon="password"
                  onChange={(e) => setConf_password(e.target.value)}
                ></LoginInput>

                <CircleIconBtn type="submit" text="Reset"></CircleIconBtn>
                <div className={styles.success}>
                  {success && <span>{success}</span>}
                </div>
                <div className={styles.error}>
                  {error && <span>{error}</span>}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer country="UK"></Footer>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query, req } = context;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  const token = query.token;
  const user_id = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
  return {
    props: {
      user_id: user_id.id, //we are only going to need the id from the token
    },
  };
}
