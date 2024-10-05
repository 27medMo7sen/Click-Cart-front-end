import { NewPasswordElement } from "../components/NewPasswordElement";
import { redirect } from "react-router-dom";
export const NewPassword = () => {
  return <NewPasswordElement />;
};

export async function action({ request, params }) {
  const data = await request.formData();
  const token = params.token;
  const user = {
    newPassword: data.get("newPassword"),
    confirmNewPassword: data.get("confirmNewPassword"),
  };
  console.log("here");

  const response = await fetch(
    `http://localhost:4000/auth/resetPassword/${token}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    }
  );
  const resData = await response.json();
  console.log(resData);
  if (response.status === 436) {
    return { status: 436, data: resData.message };
  }
  if (response.status === 400) {
    return { status: 400, data: resData };
  }
  if (!response.ok) {
    return { status: response.status, data: resData };
  }
  return redirect("/login");
}
