import classes from "./CheckInboxElement.module.css";
export const CheckBoxElement = ({ title, message }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <h1>{title}</h1>
        <p>Please check your inbox {message}</p>
      </div>
    </div>
  );
};
