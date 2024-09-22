import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import { Root } from "./pages/Root";
function App() {
  const isDark = useSelector((state) => state.ui.darkMode);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [],
    },
  ]);

  return (
    <div dark-theme={isDark ? "dark" : "light"}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
