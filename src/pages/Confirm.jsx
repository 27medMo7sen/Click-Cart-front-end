import { json } from "react-router-dom";
import { ConfirmCelebration } from "../components/ConfirmCelebration";

export const Confirm = () => {
  return <ConfirmCelebration />;
};
export const ConfirmationLoader = async ({ requset, params }) => {
  const { token } = params;
  const res = await fetch("http://localhost:4000/auth/confirm/" + token, {
    Credential: "include",
  });
  const data = await res.json();
  console.log(res.status);
  if (!res.ok) {
    throw json({ message: data.message }, { status: res.status });
  }
  return data;
};
