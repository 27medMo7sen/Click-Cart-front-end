import classes from "./NotAuthNav.module.css";
import { Link } from "react-router-dom";
import { uiActions } from "../../store/ui-slice";
import { useDispatch } from "react-redux";
export const NotAuthNav = () => {
  const dispatch = useDispatch();
  const closeSideMenu = () => {
    dispatch(uiActions.toggleSideModal());
  };
  return (
    <div className={classes.container}>
      <Link
        className={classes["Button-login"]}
        to={"login"}
        onClick={closeSideMenu}
      >
        Login
      </Link>
      <Link
        className={classes["Button-signup"]}
        to={"signup"}
        onClick={closeSideMenu}
      >
        Sign Up
      </Link>
    </div>
  );
};
