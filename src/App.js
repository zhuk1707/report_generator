import './App.css';
import React from "react";

//todo make correct report generation
//todo fix select
//todo add copy report feature

function Form({labelInfo, isInput, inputInfo, selectInfo, formInputs, handleChange}) {
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

function SalesItem({index, inputs, setInputs}) {
  const handleChange = (e) => {
    const key = e.target.name
    let value = e.target.value
    if (e.target.type === 'checkbox') {
      value = e.target.checked
    }

    if ((/[^0-9]/).test(value) && e.target.type !== 'checkbox') return

    setInputs((values) => {
        const valuesCopy = [...values]
        valuesCopy[index] = {...valuesCopy[index], [key]: value}
        return valuesCopy
      }
    )
  }

  const handleOptionBtnClick = (e) => {
    let destination = 'price'
    let delta = 10
    if (e.target.className.includes('options__button_left')) {
      delta *= (-1)
    }

    if (e.target.className.includes('options__button_count')) {
      delta /= 10
      destination = 'count'
    }

    setInputs((values) => {
        const valuesCopy = [...values]
        valuesCopy[index] = {...valuesCopy[index], [destination]: (+valuesCopy[index][destination] + delta)}
        return valuesCopy
      }
    )
  }

  return <div className="sales__item">
    <div className="sales__item-name">{inputs.itemName || 'No name'}</div>
    <form className="sales__options options">
      <label className="options__name" htmlFor={"checkbox" + index}>Used</label>
      <input
        className="option__checkbox"
        id={'checkbox' + index}
        type="checkbox"
        name="checkbox"
        value="foo"
        checked={inputs.checkbox || false}
        onChange={handleChange}
      />
      <br/>

      <label className="options__name" htmlFor={"price" + index}>Price</label>
      <button
        className='options__button options__button_left'
        type="button"
        onClick={handleOptionBtnClick}
      >-10
      </button>
      <input
        className="options__input"
        id={"price" + index}
        type="text"
        name='price'
        value={inputs.price || ''}
        onChange={handleChange}
      />
      <button
        className='options__button options__button_right'
        type="button"
        onClick={handleOptionBtnClick}
      >+10
      </button>

      <label className="options__name" htmlFor={'count' + index}>Count</label>
      <button
        className='options__button options__button_left options__button_count'
        type="button"
        onClick={handleOptionBtnClick}
      >-1
      </button>
      <input
        className="options__input"
        id={"count" + index}
        type="text"
        name='count'
        value={inputs.count || ''}
        onChange={handleChange}
      />
      <button
        className='options__button options__button_right options__button_count'
        type="button"
        onClick={handleOptionBtnClick}
      >+1
      </button>
    </form>
  </div>
}

function GeneratedReport({formInputs}) {
  return (<>
    <div className="main__report report">
      <ReportContent formInputs={formInputs}/>
      <button disabled className={"report__button"}>Copy</button>
    </div>
  </>)
}

function ReportContent({formInputs}) {
  const rate = formInputs.rate
  const shopName = formInputs.shopName
  const rentCount = formInputs.rentCount
  const hardware = formInputs.hardware
  const [sales] = React.useState()
  const rentProfit = rentCount * 14
  const amount = rentCount * 14 + +hardware
  const amountUsd = (amount / rate).toFixed(2)

  if (hardware && sales) {
    return (
      <div className="report__container">
        Курс = {rate} <br/>
        {shopName === "Almi" && "АЛМИ:"}<br/>
        {rentCount} прокат(а/ов) - {rentProfit}р<br/> <br/>
        Sales: <br/>
        ? <br/>
        ? <br/><br/>
        Железо - {hardware}р<br/><br/>
        Итого: {amount}р ( {amountUsd} $)<br/>
      </div>
    )
  }

  if (hardware) {
    return (
      <div className="report__container">
        Курс = {rate} <br/>
        {shopName === "Almi" && "АЛМИ:"}<br/>
        {rentCount} прокат(а/ов) - {rentProfit}р<br/>
        Железо - {hardware}<br/>
        Итого: {amount}р ( {amountUsd} $)<br/>
      </div>)

  }

  if (sales) {
    return (
      <div className="report__container">
        Курс = {rate || ''} <br/>
        {shopName === "Almi" && "АЛМИ:"}<br/>
        {rentCount} прокат(а/ов) - {rentProfit}р<br/> <br/>
        Sales: <br/>
        ? <br/>
        ? <br/><br/>
        Итого: {amount}р ( {amountUsd} $)<br/>
      </div>)
  }

  if (rentCount === "0") {
    return (
      <div className="report__container">
        {shopName === "Almi" && "АЛМИ: 0"}
      </div>
    )
  }


  return (
    <div className="report__container">
      Курс = {rate} <br/>
      {shopName === "Almi" && "АЛМИ:"}<br/>
      {rentCount} прокат(а/ов) - {rentProfit}р {amount}р ({amountUsd}$)
    </div>
  )
}


function App() {
  const [formInputs, setFormInputs] = React.useState({rate: '', shopName: "Almi", rentCount: '', hardware: 0})

  const [inputs, setInputs] = React.useState([
    {itemName: "Profit St. New 2mm", price: 0, count: 0, checkbox: false},
    {itemName: "Profit St. New 4mm", price: 0, count: 0, checkbox: false},
    {itemName: "Profit St. New 10mm", price: 0, count: 0, checkbox: false},
    {itemName: "Profit Out. New 2mm", price: 0, count: 0, checkbox: false},
    {itemName: "Profit Out. New 4mm", price: 0, count: 0, checkbox: false},
    {itemName: "Profit Out. New 10mm", price: 0, count: 0, checkbox: false},
  ])

  const handleChange = (event) => {
    const key = event.target.name
    const value = event.target.value
    setFormInputs((prevState) => ({...prevState, [key]: value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs)
  }

  return (
    <div className="App">
      <header className="header">
        Report Generator
      </header>

      <main className='main'>
        <Form labelInfo={'Rate'} isInput={true} inputInfo={{name: "rate"}} formInputs={formInputs}
              handleChange={handleChange}/>
        <Form labelInfo={'Shop name'} isInput={false} selectInfo={{name: "shopName"}} formInputs={formInputs}
              handleChange={handleChange}/>
        <Form labelInfo={'Rent count'} isInput={true} inputInfo={{name: "rentCount"}} formInputs={formInputs}
              handleChange={handleChange}/>
        <Form labelInfo={'Hardware earnings'} isInput={true} inputInfo={{name: "hardware"}} formInputs={formInputs}
              handleChange={handleChange}/>

        <div className="main__sales sales">
          {inputs.map((el, index) => (
            <SalesItem
              key={index}
              index={index}
              inputs={el}
              setInputs={setInputs}/>
          ))}
        </div>

        <button
          className='main__button generate-button'
          type='button'
          onClick={handleSubmit}
        >Generate
        </button>

        {/*<GeneratedReport formInputs={formInputs}/>*/}

      </main>

    </div>
  );
}

export default App;
