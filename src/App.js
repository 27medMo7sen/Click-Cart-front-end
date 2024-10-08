import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import { Root, tokenLoader } from "./pages/Root";
import { useEffect } from "react";
import { Login, action as loginAction } from "./pages/Login";
import { HomePage } from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Confirm, ConfirmationLoader } from "./pages/Confirm";
import { Error } from "./pages/Error";
import { EditProfile, action as editProfileAction } from "./pages/EditProfile";
import { action as signupAction } from "./pages/Signup";
import { CheckInbox } from "./pages/CheckInbox";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { action as LogoutAction } from "./pages/Logout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ForgotPasswordEmail,
  action as emailForgotPassword,
} from "./pages/ForgotPasswordEmail";
import {
  NewPassword,
  action as resetPasswordAction,
} from "./pages/NewPassword";
import { Profile } from "./pages/Profile";
import { Admin } from "./pages/admin/Admin";
import { AdminCategory } from "./pages/admin/admin-nav/AdminCategory";
import { AddCategory } from "./pages/admin/admin-nav/admin-forms/AddCategory";
function App() {
  const isDark = useSelector((state) => state.ui.darkMode);
  useEffect(() => {
    document
      .getElementsByTagName("body")[0]
      .setAttribute("dark-theme", isDark ? "dark" : "light");
  }, [isDark]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      id: "root",
      loader: tokenLoader,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/logout", action: LogoutAction },
        {
          path: "error",
          element: <Error />,
        },
        {
          path: "signup",
          children: [
            { index: true, element: <Signup />, action: signupAction },
            {
              path: "check-inbox",
              element: (
                <CheckInbox
                  title={"Sign up done correctly"}
                  message={"to confirm your email"}
                />
              ),
            },
          ],
        },
        {
          path: "admin",
          element: <Admin />,
          children: [
            {
              path: "",
              element: <AdminCategory />,
              children: [
                {
                  index: true,
                  element: <AddCategory />,
                },
              ],
            },
          ],
        },
        {
          path: "login",
          children: [
            { index: true, element: <Login />, action: loginAction },
            {
              path: "forgot-password",
              element: <ForgotPasswordEmail />,
              action: emailForgotPassword,
            },
            {
              path: "check-inbox",
              element: (
                <CheckInbox
                  title={"Check your inbox to proceed"}
                  message={"to finish password update"}
                />
              ),
            },
            {
              path: "new-password/:token",
              element: <NewPassword />,
              action: resetPasswordAction,
            },
          ],
        },
        {
          path: "profile",
          children: [
            { index: true, element: <Profile /> },
            {
              path: "edit",
              element: <EditProfile />,
              action: editProfileAction,
            },
          ],
        },
      ],
    },
    {
      path: "confirm/:token",
      element: <Confirm />,
      errorElement: <Error />,
      loader: ConfirmationLoader,
    },
  ]);

  return (
    <div>
      <ToastContainer
        theme="colored"
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <SkeletonTheme
        baseColor="var(--skeleton-base-color)"
        highlightColor="var(--skeleton-highlight-color)"
      >
        <RouterProvider router={router} />
      </SkeletonTheme>
    </div>
  );
}

export default App;
