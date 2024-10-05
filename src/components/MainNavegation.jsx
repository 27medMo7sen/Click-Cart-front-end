import CartDarkMode from "../assets/CartDarkMode.png";
import CartLightMode from "../assets/CartLightMode.png";
import { SearchForm } from "./SearchForm";
import { DarkModeCartIcon, LightModeCartIcon } from "../UI/Cart";
import classes from "./MainNavegation.module.css";
import { userActions } from "../store/user-slice";
import { uiActions } from "../store/ui-slice";
import { useSelector, useDispatch } from "react-redux";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { Fragment, useEffect, useState, useCallback } from "react";
import { DarkModeMenuIcon, LightModeMenuIcon } from "../UI/MenuIcon";
import { LightModeSearchIcon, DarkModeSearchIcon } from "../UI/SearchIcon";
import { Form, json, Link, useRouteLoaderData } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const MainNavegation = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.ui.darkMode);
  const userToken = useRouteLoaderData("root");
  const [isLoading, setIsLoading] = useState(false);
  const navHandler = useCallback(
    (profilePic, userName, email, phoneNumber, age) => {
      console.log(profilePic, userName, email, phoneNumber, age);
      if (profilePic) dispatch(userActions.setProfilePic(profilePic));
      dispatch(userActions.setUserName(userName));
      dispatch(userActions.setEmail(email));
      dispatch(userActions.setPhoneNumber(phoneNumber));
      dispatch(userActions.setAge(age));
    },
    [dispatch]
  );
  const profilePic = useSelector((state) => state.user.profilePic);
  const userName = useSelector((state) => state.user.userName);
  useEffect(() => {
    if (userToken) {
      async function fetchData() {
        setIsLoading(true);
        const response = await fetch("http://localhost:4000/auth/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Ecomm ${userToken}`,
          },
          credentials: "include",
        });
        const data = await response.json();
        console.log(data);
        navHandler(
          data.profilePic ? data.profilePic.secure_url : "",
          data.userName,
          data.email,
          data.phoneNumber,
          data.age
        );
        setIsLoading(false);
      }
      try {
        fetchData();
      } catch (error) {
        if (!error.ok) {
          throw json({ message: "you are not signed up!", status: 401 });
        }
      }
    }
  }, [userToken, navHandler]);

  const handleChange = () => {
    dispatch(uiActions.toggle());
    localStorage.setItem("dark", !isDarkMode);
    console.log(isDarkMode);
  };
  const openSearchModal = () => {
    dispatch(uiActions.toggleSearchModal());
  };
  const openMenu = () => {
    dispatch(uiActions.toggleSideModal());
  };
  const toggleCartHandler = () => {
    dispatch(uiActions.toggleCart());
    console.log("here");
  };

  return (
    <Fragment>
      <nav>
        <ul>
          <Link to={"/"}>
            <li className={classes.logo}>
              {isDarkMode ? (
                <img src={CartDarkMode} alt="logo" />
              ) : (
                <img src={CartLightMode} alt="logo" />
              )}
            </li>
          </Link>
          <li className={classes.search}>
            <SearchForm />
          </li>
          <li className={classes.group}>
            <span className={classes.toggle}>
              <DarkModeSwitch
                checked={isDarkMode}
                onChange={handleChange}
                size={16}
              />
            </span>
            {userToken && (
              <Link to={"/profile"} className={classes["Button-profile"]}>
                {isLoading ? (
                  <Skeleton circle={true} height={30} width={30} />
                ) : (
                  <img
                    src={profilePic}
                    alt={userName}
                    className={classes["profile-pic"]}
                  />
                )}
                {isLoading ? (
                  <Skeleton width={60} />
                ) : (
                  <span className={classes["user-name"]}>{userName}</span>
                )}
              </Link>
            )}
            {userToken && (
              <Form
                method="PATCH"
                action="/logout"
                className={classes["logout-form"]}
              >
                <button className={classes["Button-login"]}>Logout</button>
              </Form>
            )}
            {!userToken && (
              <Link className={classes["Button-login"]} to={"login"}>
                Login
              </Link>
            )}
            {!userToken && (
              <Link className={classes["Button-signup"]} to={"signup"}>
                signup
              </Link>
            )}
            <button
              className={classes["Button-cart"]}
              type="button"
              onClick={toggleCartHandler}
            >
              {!isDarkMode ? <DarkModeCartIcon /> : <LightModeCartIcon />}
              <span className={classes.counter}>0</span>
            </button>
            <button
              className={classes["search-small"]}
              type="button"
              onClick={openSearchModal}
            >
              {isDarkMode ? <DarkModeSearchIcon /> : <LightModeSearchIcon />}
            </button>
            <button
              className={classes["Button-menu"]}
              onClick={openMenu}
              type="button"
            >
              {isDarkMode ? <DarkModeMenuIcon /> : <LightModeMenuIcon />}
            </button>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};
