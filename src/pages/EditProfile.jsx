import { EditProfileForm } from "../components/pagesElements/profile/EditProfileForm";
import Cookies from "js-cookie";
export const EditProfile = () => {
  return <EditProfileForm />;
};
export const action = async ({ request, params }) => {
  const data = await request.formData();

  const token = Cookies.get("userToken");
  const user = {
    userName: data.get("userName"),
    phoneNumber: data.get("phone"),
    age: data.get("age"),
  };
  const response = await fetch("http://localhost:4000/auth/updateProfile", {
    method: "PUT",
    headers: {
      Authorization: `Ecomm ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });
  const resData = await response.json();
  console.log(response.status);

  if (response.status === 400) return { status: 400, data: resData };
  if (response.status === 436) return { status: 436, data: resData };

  return { status: 200, resData };
};
