import { useInput } from "../hooks/use-input";
import CartDarkMode from "../assets/CartDarkMode.png";
import CartLightMode from "../assets/CartLightMode.png";
import classes from "./SignupForm.module.css";
import { useSelector } from "react-redux";
import { Link, Form, useActionData } from "react-router-dom";
import { MdOutlinePerson } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { TiPhoneOutline } from "react-icons/ti";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { TbKey } from "react-icons/tb";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export const SignupForm = () => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };
  const isDarkMode = useSelector((state) => state.ui.darkMode);
  const logoUrl = isDarkMode ? CartDarkMode : CartLightMode;
  const data = useActionData();

  const {
    enteredValue: userName,
    hasError: userNameHasError,
    isValid: userNameIsValid,
    reqError: userNameReqError,
    errorMessage: userNameErrorMessage,
    defaultErrorMessageHandler: userNameDefaultErrorHandler,
    reqErrorHandler: userNameReqErrorHandler,
    valueChangeHandler: userNameChangeHandler,
    valueBlurHandler: userNameBlurHandler,
  } = useInput((value) => value.trim().length >= 3);
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
  const {
    enteredValue: phoneNumber,
    hasError: phoneHasError,
    isValid: phoneIsValid,
    reqError: phoneReqError,
    errorMessage: phoneErrorMessage,
    defaultErrorMessageHandler: phoneDefaultErrorHandler,
    reqErrorHandler: phoneReqErrorHandler,
    valueChangeHandler: phoneChangeHandler,
    valueBlurHandler: phoneBlurHandler,
  } = useInput((value) => value.trim().length >= 10);
  const {
    enteredValue: age,
    hasError: ageHasError,
    isValid: ageIsValid,
    reqError: ageReqError,
    errorMessage: ageErrorMessage,
    defaultErrorMessageHandler: ageDefaultErrorHandler,
    reqErrorHandler: ageReqErrorHandler,
    valueChangeHandler: ageChangeHandler,
    valueBlurHandler: ageBlurHandler,
  } = useInput((value) => value >= 18);
  useEffect(() => {
    userNameDefaultErrorHandler("Please enter a valid user name");
    emailDefaultErrorHandler(" Please enter a valid email");
    passwordDefaultErrorHandler("Password must be at least 6 characters");
    confirmPasswordDefaultErrorHandler("Password must be the same");
    phoneDefaultErrorHandler("Please enter a valid phone number");
    ageDefaultErrorHandler("Above 18");
    if (data && data.status === 400) {
      for (const key in data.data.message[0]) {
        // console.log("ahmed");
        console.log(data.data.message[0][key].context.key);
        if (data.data.message[0][key].context.key === "userName") {
          userNameReqErrorHandler(data.data.message[0][key].context.label);
        }
        if (data.data.message[0][key].context.key === "email") {
          emailReqErrorHandler(data.data.message[0][key].context.label);
        }
        if (data.data.message[0][key].context.key === "password") {
          passwordReqErrorHandler(data.data.message[0][key].context.label);
        }
        if (data.data.message[0][key].context.key === "confirmPassword") {
          confirmPasswordReqErrorHandler(
            data.data.message[0][key].context.label
          );
        }
        if (data.data.message[0][key].context.key === "phoneNumber") {
          phoneReqErrorHandler(data.data.message[0][key].context.label);
        }
        if (data.data.message[0][key].context.key === "age") {
          ageReqErrorHandler(data.data.message[0][key].context.label);
        }
      }
    }
  }, [
    data,
    ageDefaultErrorHandler,
    ageReqErrorHandler,
    confirmPasswordDefaultErrorHandler,
    confirmPasswordReqErrorHandler,
    emailDefaultErrorHandler,
    emailReqErrorHandler,
    passwordDefaultErrorHandler,
    passwordReqErrorHandler,
    phoneDefaultErrorHandler,
    phoneReqErrorHandler,
    userNameDefaultErrorHandler,
    userNameReqErrorHandler,
  ]);
  useEffect(() => {
    if (data && data.status === 436) {
      emailReqErrorHandler(data.message);
    }
  }, [data, emailReqErrorHandler]);

  const disabled = !(
    userNameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    confirmPasswordIsValid &&
    phoneIsValid &&
    ageIsValid
  );

  return (
    <div className={classes.wraper}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Link to={"/"} className={classes["logo-link"]}>
            <img src={logoUrl} alt="Cart Logo" className={classes.logo} />
          </Link>
          <span className={classes.title}>Create new account</span>
        </div>
        <Form
          method="POST"
          className={classes.Form}
          // onSubmit={submitHandler}
        >
          <div
            className={
              classes[
                `${
                  userNameHasError || userNameReqError
                    ? "invalid"
                    : "input-container"
                }`
              ]
            }
          >
            <label htmlFor="userName" className={classes.label}>
              <MdOutlinePerson />
              User Name
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onBlur={userNameBlurHandler}
              onChange={userNameChangeHandler}
              name="userName"
              autoComplete="off"
              className={classes.input}
            />
            {(userNameHasError || userNameReqError) && (
              <span className={classes["error-message"]}>
                {userNameErrorMessage}
              </span>
            )}
          </div>
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
              onBlur={emailBlurHandler}
              onChange={emailChangeHandler}
              name="email"
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
                name="confirmPassword"
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
          <div className={classes["phone-age"]}>
            <div
              className={
                classes[
                  `${
                    phoneHasError || phoneReqError
                      ? "invalid"
                      : "input-container"
                  }`
                ]
              }
            >
              <label htmlFor="phone" className={classes.label}>
                <TiPhoneOutline />
                Phone
              </label>
              <input
                type="text"
                id="phone"
                value={phoneNumber}
                onBlur={phoneBlurHandler}
                onChange={phoneChangeHandler}
                name="phone"
                autoComplete="off"
                className={classes.input}
              />
              {(phoneHasError || phoneReqError) && (
                <span className={classes["error-message"]}>
                  {phoneErrorMessage}
                </span>
              )}
            </div>
            <div
              className={
                classes[
                  `${
                    ageHasError || ageReqError ? "invalid-age" : "age-container"
                  }`
                ]
              }
            >
              <label htmlFor="age" className={classes.label}>
                <IoCalendarNumberOutline />
                Age
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onBlur={ageBlurHandler}
                onChange={ageChangeHandler}
                name="age"
                autoComplete="off"
                className={classes.age}
              />
              {(ageHasError || ageReqError) && (
                <span className={classes["error-message"]}>
                  {ageErrorMessage}
                </span>
              )}
            </div>
          </div>
          <button className={classes.button} disabled={disabled} type="submit">
            Signup
          </button>
          <span>
            allready have an account?
            <Link to={"/login"} className={classes["login-link"]}>
              login
            </Link>
          </span>
        </Form>
      </div>
    </div>
  );
};
