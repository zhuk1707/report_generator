import './App.css';
import React from "react";
import {logDOM} from "@testing-library/react";

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

function FormSelect({inputName, formInputs, handleChange}) {
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

function SalesItem({index, inputs, setInputs, setIsGenerated}) {
  const handleChange = (e) => {
    const key = e.target.name
    let value = e.target.value
    if (e.target.type === 'checkbox') {
      value = e.target.checked
    }

    if ((/[^0-9]/).test(value) && e.target.type !== 'checkbox') return
    if (e.target.type !== 'checkbox') value = +value

    setInputs((values) => {
        const valuesCopy = [...values]
        valuesCopy[index] = {...valuesCopy[index], [key]: value}
        return valuesCopy
      }
    )

    setIsGenerated(false)
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

    setIsGenerated(false)
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

function GeneratedReport({formInputs, salesItemInputs, isGenerated}) {
  const [clipboard, setClipboard] = React.useState('')

  const handleCopyBtnClick = () => {
    navigator.clipboard.writeText(clipboard).then()
  }

  if (isGenerated) return (<>
    <div className="main__report report">
      <ReportContent
        formInputs={formInputs}
        salesItemInputs={salesItemInputs}
        setClipboard={setClipboard}
      />
      <button
        className="report__button"
        onClick={handleCopyBtnClick}
      >Copy
      </button>
    </div>
  </>)
}

function ReportContent({formInputs, salesItemInputs, setClipboard}) {
  let rate = +formInputs.rate
  if (isNaN(rate)) rate = 0

  const shopNameFromInput = formInputs.shopName
  const shopList = {
    almi: "АЛМИ",
    siluet: 'Силуэт'
  }
  const shopName = shopList[shopNameFromInput]

  const rentCount = +formInputs.rentCount
  const hardware = +formInputs.hardware

  const rentProfit = rentCount * 14
  const amount = rentCount * 14 + hardware

  const sales = salesItemInputs.filter(el => {
    if (el.price !== 0) {
      return el
    }
  })

  const allAmount = sales.reduce((prev, el) => {
    return prev + (el.price * el.count)
  }, amount)

  const allAmountUsd = (allAmount / rate).toFixed(2)

  const renderSales = (sales) => {
    return sales.map((el, index) => {
      return <div key={index}>{el.itemName} {el.checkbox ? 'used' : ''} — {el.price}р</div>
    })
  }


  //setClipboard

  if (hardware && sales.length) {
    return (
      <div className="report__container">
        Курс = {rate} <br/>
        {shopName}:<br/>
        {rentCount} прокат(а/ов) — {rentProfit}р<br/> <br/>
        Sales:
        {renderSales(sales)} <br/>
        Железо — {hardware}р<br/><br/>
        Итого: {allAmount}р ({allAmountUsd}$)<br/>
      </div>
    )
  }

  if (hardware) {
    return (
      <div className="report__container">
        Курс = {rate} <br/>
        {shopName}:<br/>
        {rentCount} прокат(а/ов) — {rentProfit}р<br/>
        Железо — {hardware}<br/>
        Итого: {allAmount}р ( {allAmountUsd} $)<br/>
      </div>)

  }

  if (sales) {
    return (
      <div className='report__container'>
        Курс = {rate} <br/>
        {shopName}:<br/>
        {renderSales(sales)} <br/>
        Итого: {allAmount}р ( {allAmountUsd} $)<br/>
      </div>
    )
  }

  if (!rentCount) {
    return (
      <div className="report__container">
        {shopName}: 0<br/>
      </div>
    )
  }


  return (
    <div className="report__container">
      Курс = {rate} <br/>
      {shopName}:<br/>
      {rentCount} прокат(а/ов) — {allAmount}р ({allAmountUsd}$)
    </div>
  )
}


function App() {
  const [formInputs, setFormInputs] = React.useState({
    rate: '3.14',
    shopName: "almi",
    rentCount: 2,
    hardware: 1
  })

  const [salesItemInputs, setSalesItemInputs] = React.useState([
    {itemName: "Profit St. 2mm", price: 150, count: 1, checkbox: false},
    {itemName: "Profit St. 4mm", price: 0, count: 0, checkbox: false},
    {itemName: "Profit St. 10mm", price: 0, count: 0, checkbox: false},
    {itemName: "Profit P. 2mm", price: 0, count: 0, checkbox: false},
    {itemName: "Profit P. 4mm", price: 0, count: 0, checkbox: false},
    {itemName: "Profit P. 10mm", price: 90, count: 1, checkbox: true},
  ])

  const [isGenerated, setIsGenerated] = React.useState(false)

  const handleChange = (e) => {
    let key = e.target.name
    const value = e.target.value

    if ((/[^.,\d]+/).test(value) && key === "rate") return;
    if ((/[^0-9]/).test(value) && key !== "rate" && key !== "shopName") return;
    if (value.match(/[.]|,/g)?.length >= 2) return;

    setFormInputs((prevState) => ({...prevState, [key]: value}))
    setIsGenerated(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsGenerated(true)
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
          {salesItemInputs.map((el, index) => (
            <SalesItem
              key={index}
              index={index}
              inputs={el}
              setInputs={setSalesItemInputs}
              setIsGenerated={setIsGenerated}
            />
          ))}
        </div>

        <button
          className='main__button generate-button'
          type='button'
          onClick={handleSubmit}
        >Generate
        </button>

        <GeneratedReport formInputs={formInputs} salesItemInputs={salesItemInputs} isGenerated={isGenerated}/>

      </main>

    </div>
  );
}

export default App;
