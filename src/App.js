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
import { AddCategory } from "./pages/admin/admin-nav/admin-forms/category/AddCategory";
import {
  UpdateCategory,
  loader as categoriesLoader,
} from "./pages/admin/admin-nav/admin-forms/category/UpdateCategory";
import {
  DeleteCategory,
  loader as deleteCategoryLoader,
} from "./pages/admin/admin-nav/admin-forms/category/DeleteCategory";
import { AdminSubcategory } from "./pages/admin/admin-nav/AdminSubcategory";
import {
  AddSubcategory,
  loader as addSubcategoryLoader,
} from "./pages/admin/admin-nav/admin-forms/subcategory/AddSubcategory";
import {
  UpdateSubcategory,
  loader as updateSubcategoryLoader,
} from "./pages/admin/admin-nav/admin-forms/subcategory/UpdateSubcategory";
import {
  DeleteSubcategory,
  loader as deleteSubcategoryLoader,
} from "./pages/admin/admin-nav/admin-forms/subcategory/DeleteSubcategory";
import { AdminBrand } from "./pages/admin/admin-nav/AdminBrand";
import {
  AddBrand,
  loader as addBrandLoader,
} from "./pages/admin/admin-nav/admin-forms/brand/AddBrand";
import {
  UpdateBrand,
  loader as updateBrandLoader,
} from "./pages/admin/admin-nav/admin-forms/brand/UpdateBrand";
import {
  DeleteBrand,
  loader as deleteBrandLoader,
} from "./pages/admin/admin-nav/admin-forms/brand/DeleteBrand";
import { AdminProduct } from "./pages/admin/admin-nav/AdminProduct";
import {
  AddProduct,
  loader as addProductLoader,
} from "./pages/admin/admin-nav/admin-forms/product/AddProduct";

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
              path: "categories",
              element: <AdminCategory />,
              children: [
                {
                  index: true,
                  element: <AddCategory />,
                },
                {
                  path: "update",
                  element: <UpdateCategory />,
                  loader: categoriesLoader,
                },
                {
                  path: "delete",
                  element: <DeleteCategory />,
                  loader: deleteCategoryLoader,
                },
              ],
            },
            {
              path: "subcategories",
              element: <AdminSubcategory />,
              children: [
                {
                  index: true,
                  element: <AddSubcategory />,
                  loader: addSubcategoryLoader,
                },
                {
                  path: "update",
                  element: <UpdateSubcategory />,
                  loader: updateSubcategoryLoader,
                },
                {
                  path: "delete",
                  element: <DeleteSubcategory />,
                  loader: deleteSubcategoryLoader,
                },
              ],
            },
            {
              path: "brands",
              element: <AdminBrand />,
              children: [
                { index: true, element: <AddBrand />, loader: addBrandLoader },
                {
                  path: "update",
                  element: <UpdateBrand />,
                  loader: updateBrandLoader,
                },
                {
                  path: "delete",
                  element: <DeleteBrand />,
                  loader: deleteBrandLoader,
                },
              ],
            },
            {
              path: "products",
              element: <AdminProduct />,
              children: [
                {
                  index: true,
                  element: <AddProduct />,
                  loader: addProductLoader,
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
