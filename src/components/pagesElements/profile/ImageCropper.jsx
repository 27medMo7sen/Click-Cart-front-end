import { Fragment, useState } from "react";
import classes from "./ImageCropper.module.css";
import Cropper from "react-easy-crop";

export const ImageCropper = ({ image, onCropDone, onCropCanceled }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1 / 1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const onCropComplete = (croppedAreaPersentage, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  const cropHandler = () => {
    onCropDone(croppedAreaPixels);
  };
  return (
    <div className={classes.cropper}>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <Cropper
            image={image}
            aspect={aspect}
            zoom={zoom}
            crop={crop}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style={{
              containerStyle: {
                width: "100%",
                height: "500px",
                backgroundColor: "white",
                borderRadius: "10px",
              },
            }}
          />
        </div>
      </div>
      <div className={classes["btn-container"]}>
        <button className={classes["confirm-btn"]} onClick={cropHandler}>
          Confirm
        </button>
        <button className={classes["cancel-btn"]} onClick={onCropCanceled}>
          Cancel
        </button>
      </div>
    </div>
  );
};
