import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../../UI/Modal";
import { InfoCard } from "./InfoCard";
import { OrdersCard } from "./OrdersCard";
import { uiActions } from "../../../store/ui-slice";
import { userActions } from "../../../store/user-slice";
import classes from "./ProfileCard.module.css";
import { ImageCropper } from "./ImageCropper";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { base64ToBlob } from "../../../utils/ConvertToBlob";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const ProfileCard = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const token = Cookies.get("userToken");
    if (!token) navigate("/login");
  }, [navigate]);
  const setImageHandler = (imageSetted) => {
    console.log("setImgaeHandler");
    setImage(imageSetted);
    dispatch(uiActions.toggleCropperModal());
  };
  const dispatch = useDispatch();
  const closeCropper = () => {
    dispatch(uiActions.toggleCropperModal());
  };
  const cropperModalIsVisible = useSelector(
    (state) => state.ui.cropperModalIsVisible
  );
  const updateProfilePic = async (croppedImageDataURL) => {
    const croppedImageBlob = base64ToBlob(croppedImageDataURL);
    const formData = new FormData();
    formData.append("image", croppedImageBlob, "profile-pic.jpg");
    setImage(croppedImageDataURL);
    dispatch(uiActions.toggleCropperModal());
    try {
      const token = Cookies.get("userToken");
      setIsLoading(true);
      const res = await fetch("http://localhost:4000/auth/addProfilePic", {
        method: "POST",
        headers: {
          Authorization: `Ecomm ${token}`,
        },
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (data.message === "invalid token" || data.message === "wrong token")
        navigate("/login");
      if (!res.ok) throw new Error(data.message);
      console.log(data);
      dispatch(userActions.setProfilePic(croppedImageDataURL));
      toast.success("profile picture updated", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      navigate("/error", { state: { message: error.message, status: 500 } });
    }
  };
  const onCropDone = async (croppedAreaPixels) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const imageObj = new Image();
    imageObj.src = image;

    imageObj.onload = () => {
      // Set canvas dimensions to the cropped area
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      // Draw the cropped area onto the canvas
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
      const croppedImageDataURL = canvas.toDataURL("image/jpeg");
      updateProfilePic(croppedImageDataURL);
    };
  };

  const onCropCanceled = () => {
    dispatch(uiActions.toggleCropperModal());
  };
  return (
    <div className={classes.wrapper}>
      {cropperModalIsVisible && (
        <Modal onClose={closeCropper}>
          <ImageCropper
            image={image}
            onCropDone={onCropDone}
            onCropCanceled={onCropCanceled}
          />
        </Modal>
      )}
      <div className={classes.container}>
        <InfoCard handler={setImageHandler} isLoading={isLoading} />
        <OrdersCard />
      </div>
    </div>
  );
};
