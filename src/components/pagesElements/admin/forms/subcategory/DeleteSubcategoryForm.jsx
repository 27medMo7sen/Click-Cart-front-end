import { useLoaderData, useNavigate } from "react-router-dom";
import classes from "./DeleteSubcategoryForm.module.css";
import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { toast } from "react-toastify";
import { IoIosArrowDown } from "react-icons/io";
import Cookies from "js-cookie";
import Skeleton from "react-loading-skeleton";
export const DeleteSubcategoryForm = () => {
  const data = useLoaderData();
  const [isLoading, setIsLoading] = useState(false);
  const [subcategoriesLoading, setSubcategoriesLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [subcategories, setSubcategories] = useState(null);
  const [categoryIndex, setCategoryIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
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
      } else if (data.categories.length === 0) {
        setCategories(null);
      } else {
        setCategories(data.categories);
      }
    }
  }, [data, navigate]);
  const toggleWindow = () => {
    setIsOpen((prevState) => !prevState);
  };
  const selectCategoryHandler = async (index) => {
    setCategoryIndex(index);
    setSubcategoriesLoading(true);
    setProgress(50);
    const res = await fetch(
      `http://localhost:4000/subCategory/getAdminSubcategory?categoryId=${categories[index].id}`,
      {
        method: "GET",
        headers: {
          authorization: `Ecomm ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await res.json();
    setProgress(100);
    setSubcategoriesLoading(false);
    console.log(data);
    if (res.status === 200) {
      if (data.subCategories.length === 0) {
        setSubcategories(null);
      } else {
        setSubcategories(data.subCategories);
      }
    }
  };
  useEffect(() => {
    if (data) {
      setCategories(data.categories);
      console.log(categories);
    }
  }, [data, categories]);
  const deleteHandler = async (index) => {
    if (isLoading) return;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Subcategory?"
    );
    if (!confirmDelete) return;
    setIsLoading(true);
    setProgress(50);
    console.log(subcategories[index]._id);
    const res = await fetch(
      `http://localhost:4000/subCategory/deleteSubCategory?categoryId=${categories[categoryIndex]._id}&subCategoryId=${subcategories[index]._id}`,
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
      const updatedSubcategories = subcategories.filter(
        (subcategory) => subcategory._id !== subcategories[index]._id
      );
      console.log(updatedSubcategories);
      if (updatedSubcategories.length === 0) setSubcategories(null);
      else setSubcategories(updatedSubcategories);
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
      <div className={classes["category-dropdown"]}>
        <div className={classes["category-select-label"]}>
          {categories && <span>Select category</span>}
        </div>
        <div className={classes["category-select-wrapper"]}>
          {categories ? (
            <div className={classes["category-select"]} onClick={toggleWindow}>
              {categoryIndex !== -1 ? (
                <span>{categories[categoryIndex].name}</span>
              ) : (
                <span>Select category </span>
              )}
              <IoIosArrowDown />
            </div>
          ) : (
            <div>No categories found</div>
          )}
          {isOpen && (
            <div className={classes["category-select-window"]}>
              <ul className={classes["category-select-list"]}>
                {categories.map((category, index) => {
                  return (
                    <li
                      key={category.id}
                      onClick={() => {
                        selectCategoryHandler(index);
                        setIsOpen(false);
                      }}
                      className={classes["category-select-item"]}
                    >
                      {category.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
      {categoryIndex > -1 && (
        <div className={classes.container}>
          <div className={classes.header}>
            <h1>Delete subcategory</h1>
          </div>
          <div className={classes["category-container"]}>
            {subcategoriesLoading ? (
              Array(7)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} height={80} width={280} />
                ))
            ) : subcategories ? (
              subcategories.map((subcategory, index) => {
                return (
                  <div
                    key={subcategory._id}
                    className={classes["category-item"]}
                    onClick={() => {
                      deleteHandler(index);
                    }}
                  >
                    <div className={classes["category-name"]}>
                      <h3>{subcategory.name}</h3>
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
      )}
    </div>
  );
};
