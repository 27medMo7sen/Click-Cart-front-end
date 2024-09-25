import classes from "./CategoryItem.module.css";
export const CategoryItem = ({ id, name, icon }) => {
  return (
    <div key={id} className={classes.container}>
      <img src={icon} alt={name} className={classes.icon} />
      <span className={classes.name}>{name}</span>
    </div>
  );
};
