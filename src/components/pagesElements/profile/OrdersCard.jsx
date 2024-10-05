import classes from "./OrdersCard.module.css";
import { SlNotebook } from "react-icons/sl";
import { OrdersList } from "./OrdersList";

export const OrdersCard = () => {
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.header}>
          <p>
            <SlNotebook />
            Orders in the last 3 months
          </p>
        </div>
        <OrdersList />
      </div>
    </div>
  );
};
