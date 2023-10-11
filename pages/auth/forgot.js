import styles from "../../styles/forgot.module.scss";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import CircleIconBtn from "../../components/shared/buttons/circle-icon-btn";
import LoginInput from "../../components/shared/inputs/login-input";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const emailValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Please enter a valid email address"),
  });
  const forgotHandler = async () => {};
  return (
    <>
      <Header country="UK"></Header>
      <div className={styles.forgot}>
        <div>
          <div className={styles.forgot_header}>
            <div className={styles.back_svg}>
              <BiLeftArrowAlt></BiLeftArrowAlt>
            </div>
            <span>
              Forgot your password? <Link href="/">Login instead</Link>{" "}
            </span>
          </div>

          <Formik
            enableReinitialize
            initialValues={{
              email,
            }}
            validationSchema={emailValidation}
            onSubmit={() => {
              forgotHandler();
            }}
          >
            {(form) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  icon="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></LoginInput>

                <CircleIconBtn type="submit" text="Sign in"></CircleIconBtn>
                {error && <span className={styles.error}>{error}</span>}
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer country="UK"></Footer>
    </>
  );
}
