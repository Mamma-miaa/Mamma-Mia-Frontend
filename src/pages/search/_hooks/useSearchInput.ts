import { useState } from "react";

const useSearchInput = () => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  return { inputValue, handleChange };
};

export default useSearchInput;
