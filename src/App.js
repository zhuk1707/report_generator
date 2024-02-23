import './App.css';
import React from "react";


function Form({labelInfo, isInput, inputInfo, selectInfo, formInputs ,handleChange}) {
  return (<>
    <form className='main__form form' action="">
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

function FormInput({inputName, formInputs, handleChange}) {
  return (<input
      className='form__input'
      type="text"
      name={inputName}
      value={formInputs[inputName] || ''}
      onChange={handleChange}
    />
  )
}

function FormSelect({selectName, formInputs, handleChange}) {
  return (<select
    className='form__select'
    name={selectName}
    value={formInputs[selectName] || ''}
    onChange={handleChange}
  >
    <option value="Almi">ALMI</option>
  </select>)
}

function SalesItems({name}) {
  return <div className="sales__item">
    <div className="sales__item-name">{name}</div>
    <form className="sales__options options">
      <label className="options__name" htmlFor="checkbox">Used</label>
      <input
        type='checkbox'
        className="option__checkbox"
        id="checkbox"
        name="checkbox"
      />

      <div className="options__name">Price</div>
      <button className='options__button options__button_left' type="button">-</button>
      <input type="text" className="options__input" placeholder='150'/>
      <button className='options__button options__button_right' type="button">+</button>

      <div className="options__name">Count</div>
      <button className='options__button options__button_left' type="button">-</button>
      <input type="text" className="options__input" placeholder='0'/>
      <button className='options__button options__button_right' type="button">+</button>
    </form>
  </div>
}

function App() {
  const [goods] = React.useState([
    "Profit St. New 2mm", "Profit St. New 4mm",
    "Profit St. New 10mm", "Profit Out. New 2mm",
    "Profit Out. New 4mm", "Profit Out. New 10mm"
  ])

  const [formInputs, setFormInputs] = React.useState({rate: '', shopName: "Almi", rentCount: '', hardware: 0})

  const handleChange = (event) => {
    const key = event.target.name
    const value = event.target.value
    setFormInputs((prevState) => ({...prevState, [key]: value}))
  }

  const handleGenerate = () => {
    console.log(formInputs)
  }



  return (
    <div className="App">
      <header className="header">
        Report Generator
      </header>

      <main className='main'>
        <Form labelInfo={'Rate'} isInput={true} inputInfo={{name: "rate"}} formInputs={formInputs} handleChange = {handleChange} />
        <Form labelInfo={'Shop name'} isInput={false} selectInfo={{name: "shopName"}} formInputs={formInputs} handleChange={handleChange}/>
        <Form labelInfo={'Rent count'} isInput={true} inputInfo={{name: "rentCount"}} formInputs={formInputs} handleChange={handleChange}/>
        <Form labelInfo={'Hardware earnings'} isInput={true} inputInfo={{name: "hardware"}} formInputs={formInputs} handleChange={handleChange}/>

        <div className="main__sales sales">
          {goods.map((name, index) => (
            <SalesItems
              key={index}
              name={name}
            />
          ))}
        </div>

        <button className='main__button generate-button' type='button' onClick={handleGenerate}>
          Generate
        </button>

        <div className="main__report report">
          {/*<div className="report__container">
            Курс = {formInputs.rate || ''} <br/>
            {formInputs.shopName === "Almi" && "Алми:"}<br/>
            {formInputs.rentCount} прокат(а/ов) - {formInputs.rentCount*14}р<br/> <br/>
            Sales: <br/>
            ? <br/>
            ? <br/><br/>
            {(formInputs.hardware)? `Железо - ${formInputs.hardware}р` : ''}<br/><br/>
            Итого: {formInputs.rentCount * 14 + +formInputs.hardware}р ( {(formInputs.rentCount *14 + +formInputs.hardware)/formInputs.rate} $)<br/>
          </div>*/}
        </div>
      </main>

    </div>
  );
}

export default App;
