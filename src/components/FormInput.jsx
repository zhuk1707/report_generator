import React from "react";

export default function FormInput({inputName, formInputs, handleChange}) {
  return (<input
      className='form__input'
      type="text"
      name={inputName}
      value={formInputs[inputName] || ''}
      onChange={handleChange}
    />
  )
}