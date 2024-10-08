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
import {
  Form,
  json,
  Link,
  NavLink,
  useRouteLoaderData,
} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IoSettingsOutline } from "react-icons/io5";

export const MainNavegation = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.ui.darkMode);
  const userToken = useRouteLoaderData("root");
  const [isLoading, setIsLoading] = useState(false);
  const navHandler = useCallback(
    (profilePic, userName, email, phoneNumber, age, role) => {
      console.log(profilePic, userName, email, phoneNumber, age, role);
      if (profilePic) dispatch(userActions.setProfilePic(profilePic));
      else dispatch(userActions.setDefaultProfilePic());
      dispatch(userActions.setUserName(userName));
      dispatch(userActions.setEmail(email));
      dispatch(userActions.setPhoneNumber(phoneNumber));
      dispatch(userActions.setAge(age));
      dispatch(userActions.setRole(role));
    },
    [dispatch]
  );
  const profilePic = useSelector((state) => state.user.profilePic);
  const userName = useSelector((state) => state.user.userName);
  const role = useSelector((state) => state.user.role);
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
          data.age,
          data.role
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
      <nav className={classes["main-nav"]}>
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
            {userToken &&
              (isLoading ? (
                <div className={classes["Skeleton-wrapper"]}>
                  <Skeleton height={30} width={100} />
                </div>
              ) : (
                <NavLink
                  to={"/profile"}
                  className={({ isActive }) =>
                    isActive
                      ? classes["Button-profile-active"]
                      : classes["Button-profile"]
                  }
                >
                  <img
                    src={profilePic}
                    alt={userName}
                    className={classes["profile-pic"]}
                  />

                  <span className={classes["user-name"]}>{userName}</span>
                </NavLink>
              ))}
            {userToken && role === ("Admin" || "SuperAdmin") && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive ? classes["admin-active"] : classes.admin
                }
              >
                <IoSettingsOutline />
                <span>Control Panel</span>
              </NavLink>
            )}
            {userToken && (
              <Form
                method="PATCH"
                action="/logout"
                className={classes["logout-form"]}
              >
                <button className={classes["Button-logout"]}>Logout</button>
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
