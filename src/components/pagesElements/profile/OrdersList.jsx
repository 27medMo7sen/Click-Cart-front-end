import { OrderItem } from "./OrderItem";
import classes from "./OrdersList.module.css";
import delivery from "../../../components/icons/delivery.png";
import canceled from "../../../components/icons/canceled.png";
import delivered from "../../../components/icons/delivered.png";
import pending from "../../../components/icons/pending.png";
import confirmed from "../../../components/icons/confirmed.png";
const orders = [
  {
    id: 1,
    status: "Shipped",
    icon: delivery,
    date: "12/12/2021",
    price: "100$",
  },
  {
    id: 2,
    status: "cancelled",
    icon: canceled,
    date: "12/12/2021",
    price: "15$",
  },
  {
    id: 3,
    status: "delivered",
    icon: delivered,
    date: "12/12/2021",
    price: "200$",
  },
  {
    id: 4,
    status: "pending",
    icon: pending,
    date: "12/12/2021",
    price: "50$",
  },
  {
    id: 5,
    status: "confirmed",
    icon: confirmed,
    date: "12/12/2021",
    price: "300$",
  },
  {
    id: 6,
    status: "Delivered",
    icon: delivery,
    date: "12/12/2021",
  },
];
export const OrdersList = () => {
  return (
    <div className={classes.container}>
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
};
