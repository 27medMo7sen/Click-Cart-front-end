import { Fragment } from "react";
import { MainNavegation } from "../components/MainNavegation";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "../UI/Modal";
import { uiActions } from "../store/ui-slice";
import { useDispatch } from "react-redux";
import { SideModal } from "../UI/Modal";
import { SideMenuNavegation } from "../components/sideMenuNav/SideMenuNavegation";
import { SearchForm } from "../components/SearchForm";
export const Root = () => {
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const searchModalIsVisible = useSelector(
    (state) => state.ui.searchModalIsVisible
  );
  const sideModalIsVisible = useSelector(
    (state) => state.ui.SideModalIsVisible
  );
  const dispatch = useDispatch();
  const closeCart = () => {
    dispatch(uiActions.toggleCart());
  };
  const closeSideModal = () => {
    dispatch(uiActions.toggleSideModal());
  };
  const closeSearchModal = () => {
    dispatch(uiActions.toggleSearchModal());
  };
  return (
    <Fragment>
      <MainNavegation />
      {sideModalIsVisible && (
        <SideModal onClose={closeSideModal}>
          <SideMenuNavegation />
        </SideModal>
      )}
      {cartIsVisible && <Modal onClose={closeCart} />}
      {searchModalIsVisible && (
        <Modal onClose={closeSearchModal}>
          <SearchForm />
        </Modal>
      )}
      <Outlet />
    </Fragment>
  );
};
