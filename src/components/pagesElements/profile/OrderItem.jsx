import classes from "./OrderItem.module.css";
export const OrderItem = ({ order }) => {
  const { status, icon, price, date } = order;
  return (
    <div className={classes.container}>
      <img className={classes.icon} src={icon} alt={status} />
      <div className={classes.details}>
        <div className={classes.status}>{status}</div>
        <div className={classes["price-and-date"]}>
          <div className={classes.price}>{price}</div>
          <div className={classes.date}>{date}</div>
        </div>
      </div>
    </div>
  );
};
