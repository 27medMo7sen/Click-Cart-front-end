import { NotAuthNav } from "./NotAuthNav";
import classes from "./SideMenuNavegation.module.css";
import { Categories } from "./Categories";
export const SideMenuNavegation = () => {
  return (
    <div className={classes.container}>
      <span className={classes.name}>Menu</span>
      <NotAuthNav />
      <span className={classes.categories}>Categories</span>
      <Categories />
    </div>
  );
};
