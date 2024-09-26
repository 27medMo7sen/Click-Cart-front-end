import { useState } from "react";
import CartDarkMode from "../assets/CartDarkMode.png";
import CartLightMode from "../assets/CartLightMode.png";
import classes from "./LoginForm.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.trim().includes("@"));
  const {
    enteredValue: password,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput((value) => value.trim().length >= 6);
  return (
    <div className={classes.wraper}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Link to={"/"} className={classes["logo-link"]}>
            <img src={logoUrl} alt="Cart Logo" className={classes.logo} />
          </Link>
          <span className={classes.title}>Login</span>
        </div>
        <form className={classes.Form} autoComplete="false">
          <div
            className={
              classes[`${emailHasError ? "invalid" : "input-container"}`]
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
              autoComplete="off"
              className={classes.input}
            />
            {emailHasError && (
              <span className={classes["error-message"]}>
                Please enter a valid email
              </span>
            )}
          </div>
          <div
            className={
              classes[`${passwordHasError ? "invalid" : "input-container"}`]
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
                autocomplete="false"
                className={classes.input}
              />
              <span
                className={classes["password-icon"]}
                onClick={toggleVisibility}
              >
                {visible ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {passwordHasError && (
              <span className={classes["error-message"]}>
                Password must be at least 6 characters
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
          <button
            className={classes.button}
            disabled={!emailIsValid || !passwordIsValid}
            type="submit"
          >
            Login
          </button>
          <span>
            You don't have an account?
            <Link to={"/signup"} className={classes["signup-link"]}>
              signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};
