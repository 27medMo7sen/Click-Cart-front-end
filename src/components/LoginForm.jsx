import { useEffect, useState } from "react";
import CartDarkMode from "../assets/CartDarkMode.png";
import CartLightMode from "../assets/CartLightMode.png";
import classes from "./LoginForm.module.css";
import { useSelector } from "react-redux";
import { Link, Form, useActionData, useNavigation } from "react-router-dom";
import { useInput } from "../hooks/use-input";
import { HiOutlineMail } from "react-icons/hi";
import { TbKey } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
export const LoginForm = () => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isDarkMode = useSelector((state) => state.ui.darkMode);
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
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
  const {
    enteredValue: password,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    reqError: passwordReqError,
    errorMessage: passwordErrorMessage,
    defaultErrorMessageHandler: passwordDefaultErrorHandler,
    reqErrorHandler: passwordReqErrorHandler,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
  } = useInput((value) => value.trim().length >= 6);
  useEffect(() => {
    emailDefaultErrorHandler("Please enter a valid email");
    passwordDefaultErrorHandler("Password must be at least 6 characters");
    if (data && data.status === 400) {
      for (const key in data.data) {
        if (data.data[key].context.key === "email") {
          emailReqErrorHandler(data.data[key].context.label);
        }
        if (data.data[key].context.key === "password") {
          passwordReqErrorHandler(data.data[key].context.label);
        }
      }
    }
    if (data && data.status === 436) {
      if (data.data) {
        if (data.data === "Email not found") {
          emailReqErrorHandler("Email not found");
        }
        if (data.data === "Password not correct") {
          console.log("heredone");
          passwordReqErrorHandler("Password is incorrect");
        }
      }
    }
  }, [
    data,
    emailDefaultErrorHandler,
    passwordDefaultErrorHandler,
    emailReqErrorHandler,
    passwordReqErrorHandler,
  ]);
  return (
    <div className={classes.wraper}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Link to={"/"} className={classes["logo-link"]}>
            <img src={logoUrl} alt="Cart Logo" className={classes.logo} />
          </Link>
          <span className={classes.title}>Login</span>
        </div>
        <Form method="POST" className={classes.Form}>
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
          <div
            className={
              classes[
                `${
                  passwordHasError || passwordReqError
                    ? "invalid"
                    : "input-container"
                }`
              ]
            }
          >
            <label htmlFor="passord" className={classes.label}>
              <TbKey />
              Password
            </label>
            <div className={classes["password-container"]}>
              <input
                type={visible ? "text" : "password"}
                id="password"
                value={password}
                onBlur={passwordBlurHandler}
                onChange={passwordChangeHandler}
                name="password"
                autoComplete="off"
                className={classes.input}
              />
              <span
                className={classes["password-icon"]}
                onClick={toggleVisibility}
              >
                {visible ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {(passwordHasError || passwordReqError) && (
              <span className={classes["error-message"]}>
                {passwordErrorMessage}
              </span>
            )}
          </div>
          <div className={classes["remember-me-container"]}>
            <label className={classes["checkbox-label"]}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className={classes["checkbox-input"]}
              />
              <span className={classes["checkbox-custom"]}></span>
              Remember Me
            </label>
          </div>
          <div className={classes["forgot-password-container"]}>
            <Link to="forgot-password" className={classes.text}>
              {" "}
              forgot password?
            </Link>
          </div>
          <button
            className={classes.button}
            disabled={!emailIsValid || !passwordIsValid || isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Loading" : "Login"}
          </button>
          <span>
            You don't have an account?
            <Link to={"/signup"} className={classes["signup-link"]}>
              Signup
            </Link>
          </span>
        </Form>
      </div>
    </div>
  );
};
