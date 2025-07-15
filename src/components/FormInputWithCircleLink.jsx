import CircleLink from "./CircleLink.jsx";
import React from "react";

export default function FormInputWithCircleLink(
  {
    label, name, value, onChange, type = "text", placeholder
  }) {
  return (
    <div className={'form_circle-link'}>
      <label htmlFor={name} className="form__label">{label}</label>

      <div className="form__label-wrapper">
        <input
          className="form__input"
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <CircleLink/>
      </div>
    </div>


  );
}
