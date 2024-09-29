import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/use-http";
import { useEffect } from "react";
import { ConfirmCelebration } from "../components/ConfirmCelebration";

export const Confirm = () => {
  const { token } = useParams();
  const { sendRequest: sendConfirmationRequest } = useHttp();
  const getData = (data) => {
    console.log(data);
  };
  useEffect(() => {
    const confirmaionRequest = async () => {};
  }, [sendConfirmationRequest, token]);
  return <ConfirmCelebration />;
};
export const ConfirmationLoader = async () => {};
