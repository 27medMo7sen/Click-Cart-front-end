import classes from "./AddSubcategoryForm.module.css";
import Cookies from "js-cookie";
import CartDarkMode from "../../../../../assets/CartDarkMode.png";
import CartLightMode from "../../../../../assets/CartLightMode.png";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLoaderData } from "react-router-dom";
import { useRef, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { toast } from "react-toastify";
import { useInput } from "../../../../../hooks/use-input";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect } from "react";
export const AddSubcategoryFrom = () => {
  const isDarkMode = useSelector((state) => state.ui.darkMode);
  const logoUrl = isDarkMode ? CartDarkMode : CartLightMode;
  const [progress, setProgress] = useState(0);
  const token = Cookies.get("userToken");

  const {
    enteredValue: name,
    hasError: nameHasError,
    isValid: nameIsValid,
    reqError: nameReqError,
    errorMessage: nameErrorMessage,
    defaultErrorMessageHandler: nameDefaultErrorHandler,
    reqErrorHandler: nameReqErrorHandler,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput((value) => value.trim().length > 3 && value.trim().length < 20);

  const navigate = useNavigate();
  const nameRef = useRef();
  const [categoryIndex, setCategoryIndex] = useState(-1);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const data = useLoaderData();
  const selectCategoryHandler = (index) => {
    setCategoryIndex(index);
  };
  useEffect(() => {
    if (data) {
      setCategories(data.categories);
      console.log(categories);
    }
  }, [data, categories]);
  const toggleWindow = () => {
    setIsOpen((prevState) => !prevState);
  };
  useEffect(() => {
    nameDefaultErrorHandler("Name must be between 3 and 20 characters");
  }, [nameDefaultErrorHandler]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    try {
      setProgress(50);
      const response = await fetch(
        `http://localhost:4000/subCategory?categoryId=${categories[categoryIndex].id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Ecomm ${token}`,
          },
          credentials: "include",
          body: formData,
        }
      );
      const data = await response.json();
      setIsSubmitting(false);
      if (
        data.message === "invalid token" ||
        data.message === "wrong token" ||
        data.message === "Please singUp"
      ) {
        navigate("/login");
        toast.info("please login", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (response.status === 400) {
        setProgress(100);
        nameReqErrorHandler(data.message[0][0].message);
        toast.error(data.message[0][0].message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (response.status === 436) {
        console.log(data);
        if (data.message === "SubCategory already exists") {
          setProgress(100);
          nameReqErrorHandler(data.message);
          toast.error(data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        if (data.message === "You are not authorized to update this category") {
          setProgress(100);
          setCategoryIndex(-1);

          toast.error(data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else if (!response.ok) {
        throw new Error("subcategory creation failed", { status: response.status });
      } else {
        setProgress(100);
        setCategoryIndex(-1);
        toast.success("subcategory updated successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        nameReset();
      }
    } catch (error) {
      setProgress(100);
      navigate("/error", { state: { message: error.message, status: 500 } });
    }
  };
  return (
    <div className={classes.wraper}>
      <LoadingBar
        color="#2174D3"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className={classes.container}>
        <div className={classes.header}>
          <Link to={"/"} className={classes["logo-link"]}>
            <img src={logoUrl} alt="Cart Logo" className={classes.logo} />
          </Link>
          <span className={classes.title}>Add Subcategory</span>
        </div>
        <form className={classes.Form} onSubmit={submitHandler}>
          <div className={classes["category-dropdown"]}>
            <div className={classes["category-select-label"]}>
              {categories.length > 0 && <span>Select category</span>}
            </div>
            <div className={classes["category-select-wrapper"]}>
              {categories.length > 0 ? (
                <div
                  className={classes["category-select"]}
                  onClick={toggleWindow}
                >
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
          {categoryIndex !== -1 && (
            <div
              className={
                nameHasError || nameReqError
                  ? classes["invalid"]
                  : classes["category-input-container"]
              }
            >
              <label htmlFor="Name" className={classes.label}>
                Name
              </label>
              <input
                type="name"
                id="name"
                value={name}
                onBlur={nameBlurHandler}
                onChange={nameChangeHandler}
                ref={nameRef}
                name="name"
                autoComplete="off"
                className={classes.input}
              />
              <span className={classes["error-message"]}>
                {nameHasError && nameErrorMessage}
              </span>
            </div>
          )}
          <div className={classes["btn-container"]}>
            <button
              className={classes["button-submit"]}
              disabled={!nameIsValid || categoryIndex === -1|| isSubmitting}
              type="submit"
            >
              {
                isSubmitting ? "loading" : "Add"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
