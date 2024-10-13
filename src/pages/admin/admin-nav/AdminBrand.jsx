import { Fragment } from "react";
import { AdminBrandNav } from "../../../components/pagesElements/admin/AdminBrandNav";
import { Outlet } from "react-router-dom";

export const AdminBrand = () => {
  return (
    <Fragment>
      <AdminBrandNav />
      <Outlet />
    </Fragment>
  );
};
