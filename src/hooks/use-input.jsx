import { useCallback, useState } from "react";
export const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [defualtErrorMessage, setDefualtErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(defualtErrorMessage);
  const [valueIsTouched, setValueIsTouched] = useState(false);
  const [reqError, setReqError] = useState(false);
  const isValid = validateValue(enteredValue);
  const hasError = (!isValid && valueIsTouched) || reqError;

  const defaultErrorMessageHandler = useCallback(
    (message) => {
      setDefualtErrorMessage(message);
    },
    [setDefualtErrorMessage]
  );
  const reqErrorHandler = useCallback(
    (message) => {
      setReqError(true);
      setErrorMessage(message);
    },
    [setReqError, setErrorMessage]
  );
  const valueChangeHandler = useCallback(
    (event) => {
      setValueIsTouched(true);
      setReqError(false);
      setErrorMessage(defualtErrorMessage);
      setEnteredValue(event.target.value);
    },
    [
      setValueIsTouched,
      setReqError,
      setErrorMessage,
      setEnteredValue,
      defualtErrorMessage,
    ]
  );

  const valueBlurHandler = useCallback(() => {
    setValueIsTouched(true);
    setErrorMessage(defualtErrorMessage);
  }, [setValueIsTouched, setErrorMessage, defualtErrorMessage]);
  const reset = () => {
    setEnteredValue("");
    setValueIsTouched(false);
  };
  return {
    enteredValue,
    hasError,
    isValid,
    reqError,
    errorMessage,
    defaultErrorMessageHandler,
    reqErrorHandler,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};
