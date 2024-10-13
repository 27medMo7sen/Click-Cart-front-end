import { Outlet } from "react-router-dom";
import { AdminProductNav } from "../../../components/pagesElements/admin/AdminProductNav";
import { Fragment } from "react";
export const AdminProduct = () => {
  return (
    <Fragment>
      <AdminProductNav />
      <Outlet />
    </Fragment>
  );
};
