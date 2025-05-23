import React from "react";

export default function SalesItem({ index, inputs, setInputs, setIsGenerated }) {

  const updateInput = (key, value) => {
    setInputs(prevValues => {
      const newValues = [...prevValues];
      newValues[index] = { ...newValues[index], [key]: value };
      return newValues;
    });
    setIsGenerated(false);
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const newValue = type === "checkbox" ? checked : isNaN(+value) ? inputs[name] : +value;
    updateInput(name, newValue);
  };

  const handleAdjustValue = (key, adjustment) => {
    const newValue = Math.max(0, (inputs[key] || 0) + adjustment);
    updateInput(key, newValue);
  };

  const handleClearClick = () => {
    updateInput("price", 0);
    updateInput("count", 0);
    updateInput("checkbox", false);
  };

  return (
    <div className="sales__item">
      <div className="sales__item-name">{inputs.itemName || "No name"}</div>
      <form className="sales__options options">
        {/* Checkbox */}
        <div className="options__item">
          <label className="options__name" htmlFor={`checkbox${index}`}>Used</label>
          <input
            className="option__checkbox"
            id={`checkbox${index}`}
            type="checkbox"
            name="checkbox"
            checked={inputs.checkbox || false}
            onChange={handleChange}
          />
        </div>

        {/* Price Input */}
        <div className="options__item">
          <label className="options__name" htmlFor={`price${index}`}>Price</label>
          <button className="options__button options__button_left" type="button" onClick={() => handleAdjustValue("price", -10)}>-10</button>
          <input className="options__input" id={`price${index}`} type="text" name="price" value={inputs.price || ""} onChange={handleChange} />
          <button className="options__button options__button_right" type="button" onClick={() => handleAdjustValue("price", 10)}>+10</button>
        </div>

        {/* Count Input */}
        <div className="options__item">
          <label className="options__name" htmlFor={`count${index}`}>Count</label>
          <button className="options__button options__button_left options__button_count" type="button" onClick={() => handleAdjustValue("count", -1)}>-1</button>
          <input className="options__input" id={`count${index}`} type="text" name="count" value={inputs.count || ""} onChange={handleChange} />
          <button className="options__button options__button_right options__button_count" type="button" onClick={() => handleAdjustValue("count", 1)}>+1</button>
        </div>

        {/* Clear Button */}
        <div className="options__item">
          <button className="options__button options__button_clear" type="button" title="Clear all" onClick={handleClearClick}>✕</button>
        </div>
      </form>
    </div>
  );
}
