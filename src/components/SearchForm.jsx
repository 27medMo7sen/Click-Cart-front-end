import { LightModeSearchIcon, DarkModeSearchIcon } from "../UI/SearchIcon";
import { useSelector } from "react-redux";
import classes from "./SearchForm.module.css";
export const SearchForm = () => {
  const isDarkMode = useSelector((state) => state.ui.darkMode);
  return (
    <form>
      <div className={classes["Search-container"]}>
        <input className={classes.Input} type="text" placeholder="Search..." />
        <button className={classes.Button} type="submit">
          {isDarkMode ? <DarkModeSearchIcon /> : <LightModeSearchIcon />}
        </button>
      </div>
      {/* <div className={classes["Search-results"]}>
        <div>ahmed</div>
        <div>ahmed</div>
        <div>ahmed</div>
        <div>ahmed</div>
        <div>ahmed</div>
        <div>ahmed</div>
        <div>ahmed</div>
        <div>ahmed</div>
        <div>ahmed</div>
        <div>ahmed</div>
        <div>ahmed</div>
      </div> */}
    </form>
  );
};
