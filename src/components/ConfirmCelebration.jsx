import classes from "./ConfirmCelebration.module.css";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
export const ConfirmCelebration = () => {
  return (
    <div className={classes.wrapper}>
      <Confetti />
      <div className={classes.container}>
        <h1>Welcom to Click Cart</h1>
        <p>Your E-mail confirmed successfully!</p>
        <Link to={"/login"} className={classes["Button-login"]}>
          Login
        </Link>
      </div>
    </div>
  );
};
