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

export default function Reset({ token }) {
  console.log("token", token);
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
      setLoadingState(false);
    } catch (error) {
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
  const { query } = context;
  const token = query.token;
  return {
    props: {
      token,
    },
  };
}
