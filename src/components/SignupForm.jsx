import { useInput } from "../hooks/use-input";
import CartDarkMode from "../assets/CartDarkMode.png";
import CartLightMode from "../assets/CartLightMode.png";
import classes from "./SignupForm.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdOutlinePerson } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { TiPhoneOutline } from "react-icons/ti";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { TbKey } from "react-icons/tb";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export const SignupForm = () => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };
  const isDarkMode = useSelector((state) => state.ui.darkMode);
  const logoUrl = isDarkMode ? CartDarkMode : CartLightMode;
  const {
    enteredValue: userName,
    hasError: userNameHasError,
    isValid: userNameIsValid,
    valueChangeHandler: userNameChangeHandler,
    valueBlurHandler: userNameBlurHandler,
    reset: resetUserName,
  } = useInput((value) => value.trim().length >= 3);
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
  const {
    enteredValue: confirmPassword,
    hasError: confirmPasswordHasError,
    isValid: confirmPasswordIsValid,
    valueChangeHandler: confirmPasswordChangeHandler,
    valueBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPassword,
  } = useInput((value) => value === password);
  const {
    enteredValue: phone,
    hasError: phoneHasError,
    isValid: phoneIsValid,
    valueChangeHandler: phoneChangeHandler,
    valueBlurHandler: phoneBlurHandler,
    reset: resetPhone,
  } = useInput((value) => value.trim().length >= 10);
  const {
    enteredValue: age,
    hasError: ageHasError,
    isValid: ageIsValid,
    valueChangeHandler: ageChangeHandler,
    valueBlurHandler: ageBlurHandler,
    reset: resetAge,
  } = useInput((value) => value >= 18);
  return (
    <div className={classes.wraper}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Link to={"/"} className={classes["logo-link"]}>
            <img src={logoUrl} alt="Cart Logo" className={classes.logo} />
          </Link>
          <span className={classes.title}>Create new account</span>
        </div>
        <form className={classes.Form} autoComplete="false">
          <div
            className={
              classes[`${userNameHasError ? "invalid" : "input-container"}`]
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
              autoComplete="off"
              className={classes.input}
            />
            {userNameHasError && (
              <span className={classes["error-message"]}>
                Please enter a valid user name
              </span>
            )}
          </div>
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
            {passwordHasError && (
              <span className={classes["error-message"]}>
                Password must be at least 6 characters
              </span>
            )}
          </div>
          <div
            className={
              classes[
                `${confirmPasswordHasError ? "invalid" : "input-container"}`
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
                id="password"
                value={confirmPassword}
                onBlur={confirmPasswordBlurHandler}
                onChange={confirmPasswordChangeHandler}
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
            {confirmPasswordHasError && (
              <span className={classes["error-message"]}>
                Password must match
              </span>
            )}
          </div>
          <div className={classes["phone-age"]}>
            <div
              className={
                classes[`${phoneHasError ? "invalid" : "input-container"}`]
              }
            >
              <label htmlFor="phone" className={classes.label}>
                <TiPhoneOutline />
                Phone
              </label>
              <input
                type="text"
                id="phone"
                value={phone}
                onBlur={phoneBlurHandler}
                onChange={phoneChangeHandler}
                autoComplete="off"
                className={classes.input}
              />
              {phoneHasError && (
                <span className={classes["error-message"]}>
                  Please enter a valid phone number
                </span>
              )}
            </div>
            <div
              className={
                classes[`${ageHasError ? "invalid-age" : "age-container"}`]
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
                autoComplete="off"
                className={classes.age}
              />
              {ageHasError && (
                <span className={classes["error-message"]}>Obove 18</span>
              )}
            </div>
          </div>
          <button className={classes.button} type="submit">
            Signup
          </button>
          <span>
            allready have an account?
            <Link to={"/login"} className={classes["login-link"]}>
              login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};
