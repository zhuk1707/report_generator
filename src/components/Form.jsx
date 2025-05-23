import React from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

export default function Form(
  {
    labelInfo,
    isInput = true,
    inputInfo,
    selectInfo,
    formInputs,
    handleChange
  }) {
  return (<>
    <form
      className='main__form form'
      onSubmit={event => event.preventDefault()}
    >
      <label className="form__label">
        {labelInfo}
      </label>
      {(isInput)
        ? <FormInput inputName={inputInfo.name} formInputs={formInputs} handleChange={handleChange}/>
        : <FormSelect inputName={selectInfo.name} formInputs={formInputs} handleChange={handleChange}/>
      }
    </form>
  </>)
}