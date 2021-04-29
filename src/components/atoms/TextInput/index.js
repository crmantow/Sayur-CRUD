import React from "react";

const TextInput = ({ value, title, type, placeholder, onChange }) => {
  return (
    <div>
      <label className="form-label mt-3">{title}</label>

      <input
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange}
        className="form-control"
        aria-describedby="emailHelp"
      />
    </div>
  );
};

export default TextInput;
