import CartDarkMode from "../assets/CartDarkMode.png";
import CartLightMode from "../assets/CartLightMode.png";
import { SearchForm } from "./SearchForm";
import { DarkModeCartIcon, LightModeCartIcon } from "../UI/Cart";
import classes from "./MainNavegation.module.css";
import { uiActions } from "../store/ui-slice";
import { useSelector, useDispatch } from "react-redux";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { Fragment } from "react";
import { DarkModeMenuIcon, LightModeMenuIcon } from "../UI/MenuIcon";
import { LightModeSearchIcon, DarkModeSearchIcon } from "../UI/SearchIcon";
import { Link } from "react-router-dom";
export const MainNavegation = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.ui.darkMode);
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
            <Link className={classes["Button-login"]} to={"login"}>
              Login
            </Link>
            <Link className={classes["Button-signup"]} to={"signup"}>
              signup
            </Link>
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
