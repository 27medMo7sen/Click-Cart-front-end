import { useInput } from "../../../hooks/use-input";
import CartDarkMode from "../../../assets/CartDarkMode.png";
import CartLightMode from "../../../assets/CartLightMode.png";
import classes from "./EditProfileForm.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  Link,
  Form,
  useActionData,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import { MdOutlinePerson } from "react-icons/md";
import { TiPhoneOutline } from "react-icons/ti";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { useEffect } from "react";
import { userActions } from "../../../store/user-slice";
import { toast } from "react-toastify";

export const EditProfileForm = () => {
  const actionData = useActionData();
  console.log(actionData);
  const isDarkMode = useSelector((state) => state.ui.darkMode);
  const logoUrl = isDarkMode ? CartDarkMode : CartLightMode;
  const data = useActionData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const userNameDefault = useSelector((state) => state.user.userName);
  const phoneNumberDefault = useSelector((state) => state.user.phoneNumber);
  const ageDefault = useSelector((state) => state.user.age);
  useEffect(() => {
    if (actionData && actionData.status === 200) {
      dispatch(userActions.setUserName(actionData.resData.user.userName));
      dispatch(userActions.setPhoneNumber(actionData.resData.user.phoneNumber));
      dispatch(userActions.setAge(actionData.resData.user.age));
      toast.success("profile updated updated", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/profile");
    }
  }, [actionData, dispatch, navigate]);
  const {
    enteredValue: userName,
    hasError: userNameHasError,
    isValid: userNameIsValid,
    reqError: userNameReqError,
    errorMessage: userNameErrorMessage,
    setValue: setUserName,
    defaultErrorMessageHandler: userNameDefaultErrorHandler,
    reqErrorHandler: userNameReqErrorHandler,
    valueChangeHandler: userNameChangeHandler,
    valueBlurHandler: userNameBlurHandler,
  } = useInput((value) => value.trim().length >= 3);

  const {
    enteredValue: phoneNumber,
    hasError: phoneHasError,
    isValid: phoneIsValid,
    reqError: phoneReqError,
    errorMessage: phoneErrorMessage,
    setValue: setPhoneNumber,
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
    setValue: setAge,
    defaultErrorMessageHandler: ageDefaultErrorHandler,
    reqErrorHandler: ageReqErrorHandler,
    valueChangeHandler: ageChangeHandler,
    valueBlurHandler: ageBlurHandler,
  } = useInput((value) => value >= 18);
  useEffect(() => {
    userNameDefaultErrorHandler("Please enter a valid user name");
    phoneDefaultErrorHandler("Please enter a valid phone number");
    ageDefaultErrorHandler("Above 18");
    setUserName(userNameDefault);
    setPhoneNumber(phoneNumberDefault);
    setAge(ageDefault);
    if (data && data.status === 400) {
      for (const key in data.data.message[0]) {
        if (data.data.message[0][key].context.key === "userName") {
          userNameReqErrorHandler(data.data.message[0][key].context.label);
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
    phoneDefaultErrorHandler,
    phoneReqErrorHandler,
    userNameDefaultErrorHandler,
    userNameReqErrorHandler,
    setAge,
    setPhoneNumber,
    setUserName,
    userNameDefault,
    phoneNumberDefault,
    ageDefault,
  ]);
  useEffect(() => {
    if (data && data.status === 436) {
      if (data.data.message === "User name already exist") {
        userNameReqErrorHandler(data.data.message);
      }
    }
  }, [data, userNameReqErrorHandler]);

  const disabled = !(userNameIsValid && phoneIsValid && ageIsValid);

  return (
    <div className={classes.wraper}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Link to={"/"} className={classes["logo-link"]}>
            <img src={logoUrl} alt="Cart Logo" className={classes.logo} />
          </Link>
          <span className={classes.title}>Edit your profile</span>
        </div>
        <Form
          method="PUT"
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
          <button
            className={classes.button}
            disabled={disabled || isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Loading..." : "Edit"}
          </button>
        </Form>
      </div>
    </div>
  );
};
