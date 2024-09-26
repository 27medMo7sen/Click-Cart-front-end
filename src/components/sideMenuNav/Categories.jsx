import classes from "./Categories.module.css";
import { CategoriesList } from "./CategoriesList";
export const Categories = () => {
  return (
    <div className={classes.container}>
      <CategoriesList />
    </div>
  );
};
