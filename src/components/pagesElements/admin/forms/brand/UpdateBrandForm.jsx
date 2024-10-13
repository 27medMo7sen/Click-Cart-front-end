import classes from "./UpdateBrandForm.module.css";
import Cookies from "js-cookie";
import CartDarkMode from "../../../../../assets/CartDarkMode.png";
import CartLightMode from "../../../../../assets/CartLightMode.png";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLoaderData } from "react-router-dom";
import { useCallback, useRef, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { toast } from "react-toastify";
import { useInput } from "../../../../../hooks/use-input";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import addImagePlaceHolder from "../../../../../assets/add-image-placeholder.png.png";
import { uiActions } from "../../../../../store/ui-slice";
import { base64ToBlob } from "../../../../../utils/ConvertToBlob";
import { Modal } from "../../../../../UI/Modal";
import { ImageCropper } from "../../../profile/ImageCropper";
import { IoIosSearch } from "react-icons/io";

export const UpdateBrandForm = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.ui.darkMode);
  const logoUrl = isDarkMode ? CartDarkMode : CartLightMode;
  const [progress, setProgress] = useState(0);
  const token = Cookies.get("userToken");
  const cropperModalIsVisible = useSelector(
    (state) => state.ui.cropperModalIsVisible
  );
  const {
    enteredValue: name,
    hasError: nameHasError,
    isValid: nameIsValid,
    reqError: nameReqError,
    errorMessage: nameErrorMessage,
    setValue: nameSetValue,
    defaultErrorMessageHandler: nameDefaultErrorHandler,
    reqErrorHandler: nameReqErrorHandler,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput((value) => value.trim().length >= 3 && value.trim().length < 20);

  const {
    reqError: imageReqError,
    errorMessage: imageErrorMessage,
    reqErrorHandler: imageReqErrorHandler,
    valueChangeHandler: imageChangeHandler,
  } = useInput((value) => value);
  const navigate = useNavigate();
  const nameRef = useRef();
  const ref = useRef();
  const searchRef = useRef();
  const [categoryIndex, setCategoryIndex] = useState(-1);
  const [subcategoryIndex, setSubcategoryIndex] = useState(-1);
  const [brandsIndex, setBrandsIndex] = useState(-1);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSubcategoriesOpen, setIsSubcategoriesOpen] = useState(false);
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const [isSubcategoriesLoading, setIsSubcategoriesLoading] = useState(false);
  const [isBrandsLoading, setIsBrandsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const data = useLoaderData();
  const [image, setImage] = useState(addImagePlaceHolder);
  const [imageFile, setImageFile] = useState(null);
  console.log(imageFile);
  const clickHandler = () => {
    ref.current.click();
  };
  const onCropCanceled = () => {
    dispatch(uiActions.toggleCropperModal());
    setImage(addImagePlaceHolder);
  };

  const onCropDone = async (croppedAreaPixels) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const imageObj = new Image();
    imageObj.src = image;
    imageObj.onload = () => {
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      ctx.drawImage(
        imageObj,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );
      const croppedImageDataURL = canvas.toDataURL("image/png");
      const blob = base64ToBlob(croppedImageDataURL);
      setImageFile(blob);
      setImage(croppedImageDataURL);
      dispatch(uiActions.toggleCropperModal());
    };
  };
  const changeHandler = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
    imageChangeHandler(e);
    dispatch(uiActions.toggleCropperModal());
    e.target.value = "";
  };
  const selectCategoryHandler = async (index) => {
    setSubcategoryIndex(-1);
    setBrandsIndex(-1);
    setCategoryIndex(index);
    setIsSubcategoriesLoading(true);
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
    setIsSubcategoriesLoading(false);
    console.log(data);
    if (res.status === 200) {
      setSubcategories(data.subCategories);
    }
  };

  const selectSubcategoryHandler = async (index) => {
    setSubcategoryIndex(index);
    setBrandsIndex(-1);
  };
  useEffect(() => {
    if (data) {
      setCategories(data.categories);
      console.log(categories);
    }
  }, [data, categories]);
  const toggleCategoriesWindow = () => {
    setIsCategoriesOpen((prevState) => !prevState);
  };
  const toggleSubcategoriesWindow = () => {
    setIsSubcategoriesOpen((prevState) => !prevState);
  };

  useEffect(() => {
    nameDefaultErrorHandler("Name must be between 3 and 20 characters");
  }, [nameDefaultErrorHandler]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    const formData = new FormData();
    const queryParams = new URLSearchParams({
      categoryId: categories[categoryIndex]._id,
      subCategoryId: subcategories[subcategoryIndex]._id,
      brandId: brands[brandsIndex]._id,
    });
    console.log(nameRef.current.value);
    if (imageFile) formData.append("logo", imageFile);
    formData.append("name", nameRef.current.value);
    try {
      setProgress(50);
      const response = await fetch(
        `http://localhost:4000/brand/updateBrand?${queryParams}`,
        {
          method: "PUT",
          headers: {
            authorization: `Ecomm ${token}`,
          },
          body: formData,
          credentials: "include",
        }
      );

      const data = await response.json();
      console.log(data);
      console.log(response);
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
        if (data.message === "Brand already exists") {
          setProgress(100);
          setSubcategoryIndex(-1);
          nameReqErrorHandler(data.message);
          setImage(addImagePlaceHolder);
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
        if (data.message === "logo is required") {
          setProgress(100);
          imageReqErrorHandler(data.message);
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
          setSubcategoryIndex(-1);
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
        throw new Error("brand creation fail", { status: response.status });
      } else {
        setProgress(100);
        setSubcategoryIndex(-1);
        setCategoryIndex(-1);
        setBrandsIndex(-1);
        setImage(addImagePlaceHolder);
        const updatedBrands = [...brands];
        updatedBrands[brandsIndex].name = name;
        setBrands(updatedBrands);
        toast.success("brand updated successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setSearchValue("");
        setSearchQuery("");
        nameReset();
      }
    } catch (error) {
      setProgress(100);
      navigate("/error", { state: { message: error.message, status: 500 } });
    }
  };
  const updateBrands = useCallback(
    async (e) => {
      const queryParams = new URLSearchParams({
        categoryId: categories[categoryIndex]._id,
        subCategoryId: subcategories[subcategoryIndex]._id,
        name: searchQuery,
      });
      setIsBrandsLoading(true);
      const response = await fetch(
        `http://localhost:4000/brand/searchAdminBrands?${queryParams}`,
        {
          method: "POST",
          headers: {
            authorization: `Ecomm ${token}`,
          },

          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      setIsBrandsLoading(false);
      if (response.status === 200) {
        setBrands(data.brands);
        setIsBrandsOpen(true);
      }
    },
    [
      searchQuery,
      categoryIndex,
      subcategoryIndex,
      categories,
      subcategories,
      token,
    ]
  );
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        updateBrands();
      } else {
        setIsBrandsOpen(false);
      }
    }, 500);
    return () => {
      console.log("clearing time out");
      clearTimeout(timeOut);
    };
  }, [searchQuery, updateBrands]);
  const selectBrandHandler = (index) => {
    setBrandsIndex(index);
    setIsBrandsOpen(false);
    nameSetValue(brands[index].name);
    setImage(brands[index].logo.secure_url);
  };
  return (
    <div className={classes.wraper}>
      <LoadingBar
        color="#2174D3"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {cropperModalIsVisible && (
        <Modal onClose={onCropCanceled}>
          <ImageCropper
            image={image}
            onCropDone={onCropDone}
            onCropCanceled={onCropCanceled}
          />
        </Modal>
      )}
      <div className={classes.container}>
        <div className={classes.header}>
          <Link to={"/"} className={classes["logo-link"]}>
            <img src={logoUrl} alt="Cart Logo" className={classes.logo} />
          </Link>
          <span className={classes.title}>Update Brand</span>
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
                  onClick={toggleCategoriesWindow}
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
              {isCategoriesOpen && (
                <div className={classes["category-select-window"]}>
                  <ul className={classes["category-select-list"]}>
                    {categories.map((category, index) => {
                      return (
                        <li
                          key={category.id}
                          onClick={() => {
                            selectCategoryHandler(index);
                            setIsCategoriesOpen(false);
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
            <div className={classes["category-dropdown"]}>
              {isSubcategoriesLoading ? (
                <Skeleton height={25} width={200} />
              ) : (
                <div className={classes["category-select-label"]}>
                  {subcategories.length > 0 && <span>Select subcategory</span>}
                </div>
              )}
              {isSubcategoriesLoading ? (
                <Skeleton height={30} width={300} />
              ) : (
                <div className={classes["category-select-wrapper"]}>
                  {subcategories.length > 0 ? (
                    <div
                      className={classes["category-select"]}
                      onClick={toggleSubcategoriesWindow}
                    >
                      {subcategoryIndex !== -1 ? (
                        <span>{subcategories[subcategoryIndex].name}</span>
                      ) : (
                        <span>Select subcategory </span>
                      )}
                      <IoIosArrowDown />
                    </div>
                  ) : (
                    <div>No subcategories found</div>
                  )}
                  {isSubcategoriesOpen && (
                    <div className={classes["category-select-window"]}>
                      <ul className={classes["category-select-list"]}>
                        {subcategories.map((subcategory, index) => {
                          return (
                            <li
                              key={subcategory.id}
                              onClick={() => {
                                selectSubcategoryHandler(index);
                                setIsSubcategoriesOpen(false);
                              }}
                              className={classes["category-select-item"]}
                            >
                              {subcategory.name}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {subcategoryIndex !== -1 && (
            <div className={classes["brand-search-container"]}>
              <label htmlFor="brand-search" className={classes["brand-label"]}>
                Search in brands
              </label>
              <div className={classes["brand-search-wrapper"]}>
                <div className={classes["input-container"]}>
                  <input
                    type="text"
                    placeholder="search brand"
                    ref={searchRef}
                    value={searchValue}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSearchValue(e.target.value);
                      setBrandsIndex(-1);
                    }}
                    className={classes["brand-search"]}
                  />
                  <div className={classes["search-icon"]}>
                    <IoIosSearch />
                  </div>
                </div>
                {isBrandsOpen && brands.length > 0 && (
                  <div className={classes["search-results"]}>
                    <ul className={classes["search-results-list"]}>
                      {brands.map((brand, index) => {
                        return (
                          <li
                            key={brand._id}
                            onClick={() => {
                              setSearchValue(brand.name);
                              selectBrandHandler(index);
                            }}
                            className={classes["search-result-item"]}
                          >
                            {isBrandsLoading ? (
                              <Skeleton height={25} width={200} />
                            ) : (
                              brand.name
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
          {brandsIndex !== -1 && (
            <div className={classes["category-form"]}>
              <div
                className={
                  imageReqError
                    ? classes["invalid-img"]
                    : classes["category-img-container"]
                }
              >
                <label htmlFor="category-img" className={classes["img-label"]}>
                  Icon
                </label>
                <input
                  type="file"
                  ref={ref}
                  onChange={changeHandler}
                  id="category-img"
                  name="category-img"
                  style={{ display: "none" }}
                />
                <img
                  src={image}
                  alt="category"
                  onClick={clickHandler}
                  className={classes["category-img"]}
                />
                <span className={classes["img-error-message"]}>
                  {imageReqError && imageErrorMessage}
                </span>
              </div>
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
            </div>
          )}
          <div className={classes["btn-container"]}>
            <button
              className={classes["button-submit"]}
              disabled={!nameIsValid || brandsIndex === -1 || isSubmitting}
              type="submit"
            >
              {isSubmitting ? "loadeing" : "submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
