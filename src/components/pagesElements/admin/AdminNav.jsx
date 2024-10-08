import { NavLink } from "react-router-dom";
import classes from "./AdminNav.module.css";
import { Fragment } from "react";
export const AdminNav = () => {
  return (
    <Fragment>
      <nav className={classes.Nav}>
        <ul className={classes["admin-ul"]}>
          <li className={classes["admin-li"]}>
            <NavLink
              to={""}
              className={({ isActive }) =>
                isActive ? classes["admin-li-active"] : classes["admin-link"]
              }
            >
              Categories
            </NavLink>
          </li>
          <li className={classes["admin-li"]}>
            <NavLink
              to={"sub-categories"}
              className={({ isActive }) =>
                isActive ? classes["admin-li-active"] : classes["admin-link"]
              }
            >
              Sub Categories
            </NavLink>
          </li>
          <li className={classes["admin-li"]}>
            <NavLink
              to={"brands"}
              className={({ isActive }) =>
                isActive ? classes["admin-li-active"] : classes["admin-link"]
              }
            >
              Brands
            </NavLink>
          </li>
          <li className={classes["admin-li"]}>
            <NavLink
              to={"products"}
              className={({ isActive }) =>
                isActive ? classes["admin-li-active"] : classes["admin-link"]
              }
            >
              Products
            </NavLink>
          </li>
          <li className={classes["admin-li"]}>
            <NavLink
              to={"coupons"}
              className={({ isActive }) =>
                isActive ? classes["admin-li-active"] : classes["admin-link"]
              }
            >
              Coupons
            </NavLink>
          </li>
          <li className={classes["admin-li"]}>
            <NavLink
              to={"authorize"}
              className={({ isActive }) =>
                isActive ? classes["admin-li-active"] : classes["admin-link"]
              }
            >
              Authorize
            </NavLink>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};
