import { NavLink } from "react-router-dom";
import classes from "./AdminNav.module.css";
export const AdminProductNav = () => {
  return (
    <nav className={classes["sub-nav"]}>
      <ul className={classes["admin-ul"]}>
        <li className={classes["admin-li"]}>
          <NavLink
            to={""}
            className={({ isActive }) =>
              isActive ? classes["admin-li-active"] : classes["admin-link"]
            }
            end
          >
            Add
          </NavLink>
        </li>
        <li className={classes["admin-li"]}>
          <NavLink
            to={"update"}
            className={({ isActive }) =>
              isActive ? classes["admin-li-active"] : classes["admin-link"]
            }
          >
            Update
          </NavLink>
        </li>
        <li className={classes["admin-li"]}>
          <NavLink
            to={"delete"}
            className={({ isActive }) =>
              isActive ? classes["admin-li-active"] : classes["admin-link"]
            }
          >
            Delete
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
