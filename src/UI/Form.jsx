import classes from "./Form.module.css";
import CartDarkMode from "../assets/CartDarkMode.png";
import CartLightMode from "../assets/CartLightMode.png";
import { useSelector } from "react-redux";
export const Form = ({ children }) => {
  const isDarkMode = useSelector((state) => state.ui.darkMode);
  return <form className={classes.Form}>{children}</form>;
};
