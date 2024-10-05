import { redirect } from "react-router-dom";
import { ForgotPasswordEmailElement } from "../components/ForgotPasswordEmailElement";

export const ForgotPasswordEmail = () => {
  return <ForgotPasswordEmailElement />;
};
export async function action({ request, params }) {
  const data = await request.formData();
  const user = {
    email: data.get("email"),
  };
  const response = await fetch("http://localhost:4000/auth/forgotPassword", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",

    body: JSON.stringify(user),
  });
  const resData = await response.json();
  console.log(resData);
  if (response.status === 436) {
    return { status: 436, data: resData.message };
  }
  if (response.status === 400) {
    return { status: 400, data: resData };
  }
  return redirect("/login/check-inbox");
}
