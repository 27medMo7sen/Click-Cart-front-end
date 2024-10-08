import { Fragment } from "react";
import { AdminCategoryNav } from "../../../components/pagesElements/admin/AdminCategoryNav";
import { Outlet } from "react-router-dom";

export const AdminCategory = () => {
  return (
    <Fragment>
      <AdminCategoryNav />
      <Outlet />
    </Fragment>
  );
};
