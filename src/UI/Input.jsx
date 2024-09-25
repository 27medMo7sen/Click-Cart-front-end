import classes from "./Input.module.css";
export const Input = (props) => {
  return (
    <div className={classes.container}>
      <label htmlFor={props.id} className={classes.label}>
        {props.label}
      </label>
      <input {...props} className={classes.Input} />
    </div>
  );
};
