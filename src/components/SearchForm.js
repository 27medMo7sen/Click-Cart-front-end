import { LightModeSearchIcon, DarkModeSearchIcon } from "../UI/SearchIcon";
import { useSelector } from "react-redux";
import classes from "./SearchForm.module.css";
export const SearchForm = () => {
  const isDarkMode = useSelector((state) => state.ui.darkMode);
  return (
    <form className={classes.SearchForm}>
      <input className={classes.Input} type="text" placeholder="Search..." />
      <button className={classes.Button} type="submit">
        {isDarkMode ? <DarkModeSearchIcon /> : <LightModeSearchIcon />}
      </button>
    </form>
  );
};
