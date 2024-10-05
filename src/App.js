import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import { Root, tokenLoader } from "./pages/Root";
import { useEffect } from "react";
import { Login, action as loginAction } from "./pages/Login";
import { HomePage } from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Confirm, ConfirmationLoader } from "./pages/Confirm";
import { Error } from "./pages/Error";
import { action as signupAction } from "./pages/Signup";
import { CheckInbox } from "./pages/CheckInbox";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { action as LogoutAction } from "./pages/Logout";
import {
  ForgotPasswordEmail,
  action as emailForgotPassword,
} from "./pages/ForgotPasswordEmail";
import {
  NewPassword,
  action as resetPasswordAction,
} from "./pages/NewPassword";
import { Profile } from "./pages/Profile";

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
          element: <Profile />,
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
