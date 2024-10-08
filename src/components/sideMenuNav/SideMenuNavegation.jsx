import { NotAuthNav } from "./NotAuthNav";
import { AuthNav } from "./AuthNav";
import classes from "./SideMenuNavegation.module.css";
import { Categories } from "./Categories";
import Cookies from "js-cookie";

export const SideMenuNavegation = () => {
  const token = Cookies.get("userToken");
  return (
    <div className={classes.container}>
      <span className={classes.name}>Menu</span>
      {!token && <NotAuthNav />}
      {token && <AuthNav />}
      <span className={classes.categories}>Categories</span>
      <Categories />
    </div>
  );
};
