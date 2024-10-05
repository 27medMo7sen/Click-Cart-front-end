import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import { useInput } from "../hooks/use-input";
import { useEffect, useState } from "react";
import CartDarkMode from "../assets/CartDarkMode.png";
import CartLightMode from "../assets/CartLightMode.png";
import classes from "./ForgotPassworEmailElement.module.css";
import { useSelector } from "react-redux";
import { TbKey } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export const NewPasswordElement = () => {
  const isDarkMode = useSelector((state) => state.ui.darkMode);
  const data = useActionData();
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const logoUrl = isDarkMode ? CartDarkMode : CartLightMode;

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
  const {
    enteredValue: confirmPassword,
    hasError: confirmPasswordHasError,
    isValid: confirmPasswordIsValid,
    reqError: confirmPasswordReqError,
    errorMessage: confirmPasswordErrorMessage,
    defaultErrorMessageHandler: confirmPasswordDefaultErrorHandler,
    reqErrorHandler: confirmPasswordReqErrorHandler,
    valueChangeHandler: confirmPasswordChangeHandler,
    valueBlurHandler: confirmPasswordBlurHandler,
  } = useInput((value) => value === password);
  useEffect(() => {
    passwordDefaultErrorHandler("Please enter a valid password");
    confirmPasswordDefaultErrorHandler("Passwords do not match");
    if (data && data.status === 436) {
      passwordReqErrorHandler(data.data.message);
    }
    if (data && data.status === 400) {
      console.log(data.data.message[0][0].context);

      for (const key in data.data.message[0]) {
        if (data.data.message[0][key].context.key === "newPassword") {
          passwordReqErrorHandler(data.data.message[0][key].context.label);
        }
        if (data.data.message[0][key].context.key === "confirmNewPassword") {
          confirmPasswordReqErrorHandler(
            data.data.message[0][key].context.label
          );
        }
      }
    }
  }, [
    data,
    passwordDefaultErrorHandler,
    passwordReqErrorHandler,
    confirmPasswordDefaultErrorHandler,
    confirmPasswordReqErrorHandler,
  ]);
  return (
    <div className={classes.wraper}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Link to={"/"} className={classes["logo-link"]}>
            <img src={logoUrl} alt="Cart Logo" className={classes.logo} />
          </Link>
          <span className={classes.title}>Enter your password</span>
        </div>
        <Form method="PATCH" className={classes.Form}>
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
                name="newPassword"
                autoComplete="off"
                className={classes.input}
              ></input>

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
          <div
            className={
              classes[
                `${
                  confirmPasswordHasError || confirmPasswordReqError
                    ? "invalid"
                    : "input-container"
                }`
              ]
            }
          >
            <label htmlFor="confirm-password" className={classes.label}>
              <TbKey />
              Confirm Password
            </label>
            <div className={classes["password-container"]}>
              <input
                type={visible ? "text" : "password"}
                id="confirm-password"
                value={confirmPassword}
                onBlur={confirmPasswordBlurHandler}
                onChange={confirmPasswordChangeHandler}
                name="confirmNewPassword"
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
            {(confirmPasswordHasError || confirmPasswordReqError) && (
              <span className={classes["error-message"]}>
                {confirmPasswordErrorMessage}
              </span>
            )}
          </div>
          <button
            className={classes.button}
            disabled={
              !passwordIsValid || !confirmPasswordIsValid || isSubmitting
            }
            type="submit"
          >
            {isSubmitting ? "Sending" : "Send"}
          </button>
        </Form>
      </div>
    </div>
  );
};
