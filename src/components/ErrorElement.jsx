import { useRouteError, Link, useLocation } from "react-router-dom";
import classes from "./ErrorElement.module.css";
import errorImage from "../assets/noun-broken-shopping-cart-710647.png";
export const ErrorElement = () => {
  const error = useRouteError();
  const location = useLocation();
  console.log(location.state);

  let message = location.state?.message || "Something went wrong!";
  let status = location.state?.status || 400;
  if (error) {
    if (error.status === 404) {
      status = 404;
      message = "Could not find resource or page.";
    }
    if ((error.status === 500 || error.status === 400) && error.data.message) {
      message = error.data.message;
      status = error.status;
    }
  }

  return (
    <div className={classes.wrapper}>
      <img src={errorImage} alt="error" className={classes["img-container"]} />
      <div className={classes.container}>
        <h1>{status || 400}</h1>
        <p>{message}</p>
        <Link to={"/"} className={classes["Button-login"]}>
          Home page
        </Link>
      </div>
    </div>
  );
};
