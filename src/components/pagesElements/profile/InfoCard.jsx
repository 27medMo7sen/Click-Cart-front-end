import { useActionData, Link } from "react-router-dom";
import classes from "./InfoCard.module.css";
import { TiPhoneOutline } from "react-icons/ti";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../../store/user-slice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const InfoCard = ({ handler, isLoading }) => {
  const actionData = useActionData();
  const dispatch = useDispatch();
  const profilePic = useSelector((state) => state.user.profilePic);
  const userName = useSelector((state) => state.user.userName);
  const email = useSelector((state) => state.user.email);
  const phoneNumber = useSelector((state) => state.user.phoneNumber);
  const age = useSelector((state) => state.user.age);
  console.log(actionData);
  useEffect(() => {
    if (actionData) dispatch(userActions.setProfilePic(actionData.secure_url));
  }, [actionData, dispatch]);

  const ref = useRef();
  // const btnRef = useRef();
  const clickHandler = () => {
    ref.current.click();
  };
  const changeHandler = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      handler(reader.result);
    };
    e.target.value = "";
  };
  return (
    <div>
      <div className={classes["info-container"]}>
        <div className={classes["img-container"]}>
          <input
            ref={ref}
            type="file"
            id="file"
            name="image"
            onChange={changeHandler}
            style={{ display: "none" }}
          />
          <button
            type="button"
            className={classes["button-upload"]}
            onClick={clickHandler}
            disabled={isLoading}
          >
            <MdOutlineEdit />
          </button>
          {isLoading ? (
            <Skeleton circle={true} height={200} width={200} />
          ) : (
            <img
              src={profilePic}
              alt="profile"
              className={classes["profile-pic"]}
            />
          )}
          <div className={classes["main-info"]}>
            <h3>{userName}</h3>
            <p>{email}</p>
          </div>
        </div>
        <div className={classes["info-section"]}>
          <p>
            <TiPhoneOutline /> {phoneNumber}
          </p>
          <p>
            <IoCalendarNumberOutline /> {age} years old
          </p>
        </div>
        <div className={classes["button-container"]}>
          <Link className={classes["button-edit"]} to={"edit"}>
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};
