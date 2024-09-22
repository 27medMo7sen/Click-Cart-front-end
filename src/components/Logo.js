import classes from "./Logo.module.css";
export const Logo = () => {
  return (
    <div className={classes.container}>
      <span className={classes.first}>
        Click <span className={classes.second}>Cart</span>
      </span>
    </div>
  );
};
