import { DeleteCategoryForm } from "../../../../../components/pagesElements/admin/forms/category/DeleteCategoryForm";
import Cookies from "js-cookie";
import { redirect } from "react-router-dom";
export const DeleteCategory = () => {
  return (
    <div>
      <DeleteCategoryForm />
    </div>
  );
};
export const loader = async () => {
  const token = Cookies.get("userToken");
  const response = await fetch(
    "http://localhost:4000/category/getAdminCategories",
    {
      method: "GET",
      headers: {
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
