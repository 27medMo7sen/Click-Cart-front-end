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
export const MainNavegation = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.ui.darkMode);
  const handleChange = () => {
    dispatch(uiActions.toggle());
    localStorage.setItem("dark", !isDarkMode);
    console.log(isDarkMode);
  };
  const toggleCartHandler = () => {
    dispatch(uiActions.showCart());
    console.log("here");
  };
  return (
    <Fragment>
      <nav>
        <ul>
          <li className={classes.logo}>
            {isDarkMode ? (
              <img src={CartDarkMode} alt="logo" />
            ) : (
              <img src={CartLightMode} alt="logo" />
            )}
          </li>
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
            <button className={classes["Button-signin"]} type="button">
              sign in
            </button>
            <button className={classes["Button-signup"]} type="button">
              sign up
            </button>
            <button
              className={classes["Button-cart"]}
              type="button"
              onClick={toggleCartHandler}
            >
              {!isDarkMode ? <DarkModeCartIcon /> : <LightModeCartIcon />}
              <span className={classes.counter}>0</span>
            </button>
            <button className={classes["search-small"]} type="button">
              {isDarkMode ? <DarkModeSearchIcon /> : <LightModeSearchIcon />}
            </button>
            <button className={classes["Button-menu"]} type="button">
              {isDarkMode ? <DarkModeMenuIcon /> : <LightModeMenuIcon />}
            </button>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};
