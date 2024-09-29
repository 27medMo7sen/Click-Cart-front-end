import { SignupForm } from "../components/SignupForm";
import { json, redirect } from "react-router-dom";
export const Signup = () => {
  return <SignupForm />;
};
export async function action({ request, params }) {
  const data = await request.formData();
  console.log("here");
  const user = {
    userName: data.get("userName"),
    email: data.get("email"),
    password: data.get("password"),
    confirmPassword: data.get("confirmPassword"),
    phoneNumber: data.get("phone"),
    age: data.get("age"),
  };
  const response = await fetch("http://localhost:4000/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const resData = await response.json();
  console.log(response);

  if (response.status === 400) return { status: 400, data: resData };
  if (response.status === 436)
    return { status: 436, message: "E-mail allready exists" };
  if (!response.ok)
    throw json({ message: "you are not signed up!" }, { status: 401 });
  return redirect("/");
}
