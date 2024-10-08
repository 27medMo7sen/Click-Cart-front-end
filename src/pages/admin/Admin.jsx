import { Fragment } from "react";
import { AdminNav } from "../../components/pagesElements/admin/AdminNav";
import { Outlet } from "react-router-dom";

export const Admin = () => {

  return (
    <Fragment>
      <AdminNav />
      <Outlet />
    </Fragment>
  );
};
