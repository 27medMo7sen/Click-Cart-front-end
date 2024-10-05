import Cookies from "js-cookie";
import { redirect } from "react-router-dom";
export const action = async ({ request }) => {
  const token = Cookies.get("userToken");
  console.log("navigated");
  const response = await fetch(`http://localhost:4000/auth/logout`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Ecomm ${token}`,
    },
  });
  const resData = await response.json();
  console.log(resData);

  if (!response.ok) {
    return { status: response.status, data: resData };
  }
  Cookies.remove("userToken");
  return redirect("/");
};
