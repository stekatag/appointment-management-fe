import { useState } from "react";

const useForm = (initialState = {}) => {
  const [formState, setFormState] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDateChange = (newValue) => {
    setFormState((prevState) => ({
      ...prevState,
      appointmentDateTime: newValue,
    }));
  };

  return [formState, handleInputChange, handleDateChange];
};

export default useForm;
