import { AddBrandForm } from "../../../../../components/pagesElements/admin/forms/brand/AddBrandForm";
import { redirect } from "react-router-dom";
import Cookies from "js-cookie";
export const AddBrand = () => {
  return <AddBrandForm />;
};
export const loader = async () => {
  const token = Cookies.get("userToken");
  const response = await fetch(
    "http://localhost:4000/category/getAdminCategories",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Ecomm ${token}`,
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  if (
    data.message === "invalid token" ||
    data.message === "wrong token" ||
    data.message === "Please SignUp"
  ) {
    return redirect("/login");
  }
  console.log(data);
  return data;
};
