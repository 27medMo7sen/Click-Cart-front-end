import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import { Root } from "./pages/Root";
import { useEffect } from "react";
import { Login } from "./pages/Login";
import { HomePage } from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Confirm } from "./pages/Confirm";
import { Error } from "./pages/Error";
import { action as signupAction } from "./pages/Signup";
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
      children: [
        { index: true, element: <HomePage /> },
        { path: "signup", element: <Signup />, action: signupAction },
      ],
    },
    { path: "Login", element: <Login /> },
    { path: "confirm/:token", element: <Confirm /> },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
