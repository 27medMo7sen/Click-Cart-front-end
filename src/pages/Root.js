import { Fragment } from "react";
import { MainNavegation } from "../components/MainNavegation";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "../UI/Modal";
import { uiActions } from "../store/ui-slice";
import { useDispatch } from "react-redux";
export const Root = () => {
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const dispatch = useDispatch();
  const closeCart = () => {
    dispatch(uiActions.showCart());
  };
  return (
    <Fragment>
      <MainNavegation />
      {cartIsVisible && <Modal onClose={closeCart} />}
      <Outlet />
    </Fragment>
  );
};
