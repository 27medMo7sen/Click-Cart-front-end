import { Outlet } from "react-router-dom";
import { AdminSubategoryNav } from "../../../components/pagesElements/admin/AdminSubcategoryNav";
import { Fragment } from "react";
export const AdminSubcategory = () => {
  return (
    <Fragment>
      <AdminSubategoryNav />
      <Outlet />
    </Fragment>
  );
};
