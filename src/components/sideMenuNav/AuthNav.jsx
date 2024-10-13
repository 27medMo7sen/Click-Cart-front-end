import classes from "./AuthNav.module.css";
import { Link, Form } from "react-router-dom";
import { uiActions } from "../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import { IoSettingsOutline } from "react-icons/io5";

export const AuthNav = () => {
  const dispatch = useDispatch();
  const closeSideMenu = () => {
    dispatch(uiActions.toggleSideModal());
  };
  const profilePic = useSelector((state) => state.user.profilePic);
  const userName = useSelector((state) => state.user.userName);
  const role = useSelector((state) => state.user.role);
  console.log(role);

  return (
    <div className={classes.container}>
      <Link
        to={"/profile"}
        className={classes["Button-profile"]}
        onClick={closeSideMenu}
      >
        <img
          src={profilePic}
          alt={userName}
          className={classes["profile-pic"]}
        />
        <span className={classes["user-name"]}>{userName}</span>
      </Link>
      {(role === "SuperAdmin" || role === "Admin") && (
        <Link
          to="/admin/categories"
          className={classes["admin"]}
          onClick={closeSideMenu}
        >
          <IoSettingsOutline />
          <span>Control Panel</span>
        </Link>
      )}
      <Form method="PATCH" action="/logout" className={classes["logout-form"]}>
        <button className={classes["Button-logout"]} onClick={closeSideMenu}>
          Logout
        </button>
      </Form>
    </div>
  );
};
