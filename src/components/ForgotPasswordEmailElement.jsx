import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import { useInput } from "../hooks/use-input";
import { useEffect } from "react";
import CartDarkMode from "../assets/CartDarkMode.png";
import CartLightMode from "../assets/CartLightMode.png";
import classes from "./ForgotPassworEmailElement.module.css";
import { useSelector } from "react-redux";
import { HiOutlineMail } from "react-icons/hi";

export const ForgotPasswordEmailElement = () => {
  const isDarkMode = useSelector((state) => state.ui.darkMode);
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const logoUrl = isDarkMode ? CartDarkMode : CartLightMode;

  const {
    enteredValue: email,
    hasError: emailHasError,
    isValid: emailIsValid,
    reqError: emailReqError,
    errorMessage: emailErrorMessage,
    defaultErrorMessageHandler: emailDefaultErrorHandler,
    reqErrorHandler: emailReqErrorHandler,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
  } = useInput((value) => value.trim().includes("@"));
  useEffect(() => {
    emailDefaultErrorHandler("Please enter a valid email");
    if (data && data.status === 436) {
      emailReqErrorHandler(data.data.message);
    }
    if (data && data.status === 400) {
      emailReqErrorHandler("Email can't be empty");
    }
  }, [data, emailDefaultErrorHandler, emailReqErrorHandler]);
  return (
    <div className={classes.wraper}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Link to={"/"} className={classes["logo-link"]}>
            <img src={logoUrl} alt="Cart Logo" className={classes.logo} />
          </Link>
          <span className={classes.title}>Enter your Email</span>
        </div>
        <Form method="PATCH" className={classes.Form}>
          <div
            className={
              classes[
                `${
                  emailHasError || emailReqError ? "invalid" : "input-container"
                }`
              ]
            }
          >
            <label htmlFor="E-mail" className={classes.label}>
              <HiOutlineMail />
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              name="email"
              onBlur={emailBlurHandler}
              onChange={emailChangeHandler}
              autoComplete="off"
              className={classes.input}
            />
            {(emailHasError || emailReqError) && (
              <span className={classes["error-message"]}>
                {emailErrorMessage}
              </span>
            )}
          </div>
          <button
            className={classes.button}
            disabled={!emailIsValid || isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Sending" : "Send"}
          </button>
        </Form>
      </div>
    </div>
  );
};
