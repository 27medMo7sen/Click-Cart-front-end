import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import { Root } from "./pages/Root";
import { useEffect } from "react";
import { Signin } from "./pages/Signin";
import { HomePage } from "./pages/Home";
import { Signup } from "./pages/Signup";
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
      children: [
        { index: true, element: <HomePage /> },
        { path: "signin", element: <Signin /> },
        { path: "signup", element: <Signup /> },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
