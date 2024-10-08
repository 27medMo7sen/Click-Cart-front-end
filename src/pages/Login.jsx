import { LoginForm } from "../components/LoginForm";
import { redirect } from "react-router-dom";
export const Login = () => {
  return <LoginForm />;
};
export async function action({ request, params }) {
  const data = await request.formData();

  const user = {
    email: data.get("email"),
    password: data.get("password"),
  };
  const response = await fetch("http://localhost:4000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });
  const resData = await response.json();
  if (response.status === 436) {
    return { status: 436, data: resData.message };
  }
  if (response.status === 400) {
    return { status: 400, data: resData.message[0] };
  }
  localStorage.setItem("role", resData.updatedUser.role);
  return redirect("/");
}
