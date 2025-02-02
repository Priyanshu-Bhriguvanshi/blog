import React from "react";
import { useId } from "react";

export const Select = ({ name, option, label = "", ...props }, ref) => {
  const id = useId();

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <select name={name} id={id} {...props} ref={ref}>
        {option.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.forwardRef(Select);
