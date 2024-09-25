import classes from "./NotAuthNav.module.css";
import { Link } from "react-router-dom";
export const NotAuthNav = () => {
  return (
    <div className={classes.container}>
      <Link className={classes["Button-signin"]} to={"signin"}>
        Sign In
      </Link>
      <Link className={classes["Button-signup"]} to={"signup"}>
        Sign Up
      </Link>
    </div>
  );
};
