import React from "react";

export default function FormSelect({inputName, formInputs, handleChange}) {
  return (<select
    className='form__select'
    name={inputName}
    value={formInputs[inputName] || ''}
    onChange={handleChange}
  >
    <option value="almi">АЛМИ</option>
    <option value="siluet">Силуэт</option>
  </select>)
}