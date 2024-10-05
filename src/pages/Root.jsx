import { Fragment, useState, useEffect } from "react";
import { MainNavegation } from "../components/MainNavegation";
import { Outlet, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "../UI/Modal";
import { uiActions } from "../store/ui-slice";
import { useDispatch } from "react-redux";
import { SideModal } from "../UI/Modal";
import { SideMenuNavegation } from "../components/sideMenuNav/SideMenuNavegation";
import { SearchForm } from "../components/SearchForm";
import LoadingBar from "react-top-loading-bar";
import Cookies from "js-cookie";
export const Root = () => {
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const [progress, setProgress] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "submitting") {
      setProgress(25);
    } else if (navigation.state === "loading") {
      setProgress(50);
    } else setProgress(100);
  }, [navigation.state]);
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
      <LoadingBar
        color="#2174D3"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
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
export const tokenLoader = () => {
  const token = Cookies.get("userToken");
  console.log(token);
  if (!token) return null;
  return token;
};
