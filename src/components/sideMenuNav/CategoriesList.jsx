import bags from "../icons/bags.png";
import devices from "../icons/devices.png";
import electronics from "../icons/electronics.png";
import fashion from "../icons/fashion.png";
import jewellery from "../icons/jewellery.png";
import makeup from "../icons/makeup.png";
import furniture from "../icons/furniture.png";

import { CategoryItem } from "./CategoryItem";
import classes from "./CategoriesList.module.css";
const CategoriesListArr = [
  {
    id: 1,
    name: "Electronics",
    icon: electronics,
  },
  {
    id: 2,
    name: "Fashion",
    icon: fashion,
  },
  {
    id: 3,
    name: "Jewellery",
    icon: jewellery,
  },
  {
    id: 4,
    name: "Makeup",
    icon: makeup,
  },
  {
    id: 5,
    name: "Bags",
    icon: bags,
  },
  {
    id: 6,
    name: "Devices",
    icon: devices,
  },
  {
    id: 7,
    name: "Furniture",
    icon: furniture,
  },
];
export const CategoriesList = () => {
  return (
    <div className={classes.container}>
      {CategoriesListArr.map((category) => (
        <CategoryItem
          key={category.id}
          name={category.name}
          icon={category.icon}
        />
      ))}
    </div>
  );
};
