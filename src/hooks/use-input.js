import { useState } from "react";
export const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [valueIsTouched, setValueIsTouched] = useState(false);
  const isValid = validateValue(enteredValue);
  const hasError = !isValid && valueIsTouched;
  const valueChangeHandler = (event) => {
    setValueIsTouched(true);
    setEnteredValue(event.target.value);
  };
  
  const valueBlurHandler = () => {
    setValueIsTouched(true);
  };
  const reset = () => {
    setEnteredValue("");
    setValueIsTouched(false);
  };
  return {
    enteredValue,
    hasError,
    isValid,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};
