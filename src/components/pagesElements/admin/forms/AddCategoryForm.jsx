import classes from "./AddCategoryForm.module.css";
import Cookies from "js-cookie";
import CartDarkMode from "../../../../assets/CartDarkMode.png";
import CartLightMode from "../../../../assets/CartLightMode.png";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import addImagePlaceHolder from "../../../../assets/add-image-placeholder.png.png";
import { useRef, useState } from "react";
import { ImageCropper } from "../../profile/ImageCropper";
import { Modal } from "../../../../UI/Modal";
import { uiActions } from "../../../../store/ui-slice";
import LoadingBar from "react-top-loading-bar";
import { base64ToBlob } from "../../../../utils/ConvertToBlob";
import { toast } from "react-toastify";
import { useInput } from "../../../../hooks/use-input";
import { useEffect } from "react";
export const AddCategoryForm = () => {
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
    defaultErrorMessageHandler: nameDefaultErrorHandler,
    reqErrorHandler: nameReqErrorHandler,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput((value) => value.trim().length > 3 && value.trim().length < 10);
  const {
    reqError: imageReqError,
    errorMessage: imageErrorMessage,
    reqErrorHandler: imageReqErrorHandler,
    valueChangeHandler: imageChangeHandler,
  } = useInput((value) => value);
  const navigate = useNavigate();
  const ref = useRef();
  const nameRef = useRef();
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
  useEffect(() => {
    nameDefaultErrorHandler("Name must be between 3 and 10 characters");
  }, [nameDefaultErrorHandler]);
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
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (imageFile) formData.append("image", imageFile);
    formData.append("name", nameRef.current.value);
    try {
      setProgress(50);
      const response = await fetch("http://localhost:4000/category", {
        method: "POST",
        headers: {
          Authorization: `Ecomm ${token}`,
        },
        credentials: "include",
        body: formData,
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (response.status === 400) {
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
        if (data.message === "Category already exists") {
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
        if (data.message === "Image is required") {
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
      } else if (!response.ok) {
        throw new Error("Category not added", { status: response.status });
      } else {
        setProgress(100);
        toast.success("profile picture updated", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        nameReset();
        setImage(addImagePlaceHolder);
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
          <span className={classes.title}>Add category</span>
        </div>
        <form className={classes.Form} onSubmit={submitHandler}>
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
          <div className={classes["btn-container"]}>
            <button
              className={classes["button-submit"]}
              disabled={!nameIsValid || !imageFile}
              type="submit"
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
