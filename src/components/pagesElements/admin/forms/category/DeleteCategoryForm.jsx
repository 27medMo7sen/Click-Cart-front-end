import { useLoaderData, useNavigate } from "react-router-dom";
import classes from "./DeleteCategoryForm.module.css";
import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
export const DeleteCategoryForm = () => {
  const data = useLoaderData();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [progress, setProgress] = useState(0);
  const token = Cookies.get("userToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      if (
        data.message === "invalid token" ||
        data.message === "wrong token" ||
        data.message === "Please SignUp"
      ) {
        navigate("/login");
      } else if (data.categories.length === 0) setCategories(null);
      else setCategories(data.categories);
    }
  }, [data, navigate]);

  const deleteHandler = async (index) => {
    if (isLoading) return;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;
    setIsLoading(true);
    setProgress(50);
    console.log(categories[index]._id);
    const res = await fetch(
      `http://localhost:4000/category/deleteCategory?categoryId=${categories[index]._id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Ecomm ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      const updatedCategories = categories.filter(
        (category) => category._id !== categories[index]._id
      );
      if (updatedCategories.length === 0) setCategories(null);
      else setCategories(updatedCategories);
      setIsLoading(false);
      setProgress(100);
      toast.success("Category deleted successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setIsLoading(false);
      setProgress(100);
      toast.error("Some Error happend", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className={classes.wrapper}>
      <LoadingBar
        color="#2174D3"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className={classes.container}>
        <div className={classes.header}>
          <h1>Delete Category</h1>
        </div>
        <div className={classes["category-container"]}>
          {categories ? (
            categories.map((category, index) => {
              return (
                <div
                  key={category._id}
                  className={classes["category-item"]}
                  onClick={() => {
                    deleteHandler(index);
                  }}
                >
                  <div className={classes["category-img"]}>
                    <img src={category.image.secure_url} alt={category.name} />
                  </div>
                  <div className={classes["category-name"]}>
                    <h3>{category.name}</h3>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={classes["no-category"]}>
              <h1>No Category Found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
