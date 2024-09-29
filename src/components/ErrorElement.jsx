import { useRouteError } from "react-router-dom";

export const ErrorElement = () => {
  const error = useRouteError();
  console.log(error);

  return <p>"error"{error.data.message}</p>;
};
