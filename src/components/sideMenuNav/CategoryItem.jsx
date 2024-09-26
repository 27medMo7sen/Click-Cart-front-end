import classes from "./CategoryItem.module.css";
import { uiActions } from "../../store/ui-slice";
import { useDispatch } from "react-redux";
export const CategoryItem = ({ id, name, icon }) => {
  const dispatch = useDispatch();
  const closeSideMenu = () => {
    dispatch(uiActions.toggleSideModal());
  };
  return (
    <div key={id} className={classes.container} onClick={closeSideMenu}>
      <img src={icon} alt={name} className={classes.icon} />
      <span className={classes.name}>{name}</span>
    </div>
  );
};
