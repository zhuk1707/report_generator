import './App.css';
import React from "react";

function Form({labelInfo, isInput, inputInfo, selectInfo, formInputs, handleChange}) {
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
    console.log(key, value)
    // if (key === 'price' && value < 0) value = 0


    setInputs((values) => {
        const valuesCopy = [...values]
        valuesCopy[index] = {
          ...valuesCopy[index],
          [key]: value,
        }
        return valuesCopy
      }
    )

    setIsGenerated(false)
  }

  const handlePriceLeftClick = () => {
    const itemPrice = inputs.price
    let delta = 10
    if (itemPrice <= 0) {
      delta = 0
    }

    if (itemPrice < 10) {
      delta = itemPrice
    }

    setInputs((values) => {
        const valuesCopy = [...values]
        valuesCopy[index] = {...valuesCopy[index], price: (+valuesCopy[index].price - delta)}
        return valuesCopy
      }
    )
    setIsGenerated(false)
  }

  const handlePriceRightClick = () => {
    setInputs((values) => {
        const valuesCopy = [...values]
        valuesCopy[index] = {...valuesCopy[index], price: (+valuesCopy[index].price + 10)}
        return valuesCopy
      }
    )
    setIsGenerated(false)
  }

  const handleCountLeftClick = () => {
    if (inputs.count > 0) {
      setInputs((values) => {
          const valuesCopy = [...values]
          valuesCopy[index] = {...valuesCopy[index], count: (+valuesCopy[index].count - 1)}
          return valuesCopy
        }
      )
    }
    setIsGenerated(false)
  }

  const handleCountRightClick = () => {
    setInputs((values) => {
        const valuesCopy = [...values]
        valuesCopy[index] = {...valuesCopy[index], count: (+valuesCopy[index].count + 1)}
        return valuesCopy
      }
    )
    setIsGenerated(false)
  }

  const handleClearClick = () => {
    setInputs((values) => {
        const valuesCopy = [...values]
        valuesCopy[index] = {...valuesCopy[index], price: 0, count: 0, checkbox: false}
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
        onClick={handlePriceLeftClick}
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
        onClick={handlePriceRightClick}
      >+10
      </button>

      <label className="options__name" htmlFor={'count' + index}>Count</label>
      <button
        className='options__button options__button_left options__button_count'
        type="button"
        onClick={handleCountLeftClick}
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
        onClick={handleCountRightClick}
      >+1
      </button>
      <button
        className='options__button options__button_clear'
        type="button"
        title='Clear all'
        onClick={handleClearClick}
      >✕
      </button>
    </form>
  </div>
}

//todo
function GeneratedReport({formInputs, salesItemInputs, isGenerated}) {
  const [clipboard, setClipboard] = React.useState('error')

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

  const getSalesList = (sales) => {
    return sales.reduce((prev, el) => {
      return prev + `${el.itemName} ${el.checkbox ? 'used' : ''} — ${el.price}р\n`
    }, '')
  }

  if (hardware && sales.length && rentCount) {
    setClipboard(`Курс = ${rate}\n${shopName}:\n${rentCount} прокат(а/ов) — ${rentProfit}р\n\nПродажи:\n${getSalesList(sales)} \nЖелезо — ${hardware}р\nИтого: ${allAmount}р (${allAmountUsd}$)\n`)

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
    );
  }

  if (sales.length && rentCount) {
    setClipboard(`Курс = ${rate}\n${shopName}:\n${rentCount} прокат(а/ов) — ${rentProfit}р\n\nПродажи:\n${getSalesList(sales)}\nИтого: ${allAmount}р (${allAmountUsd}$)\n`)

    return (
      <div className="report__container">
        Курс = {rate} <br/>
        {shopName}:<br/>
        {rentCount} прокат(а/ов) — {rentProfit}р<br/> <br/>
        Sales:
        {renderSales(sales)} <br/>
        Итого: {allAmount}р ({allAmountUsd}$)<br/>
      </div>
    );
  }

  if (hardware && sales.length) {

    setClipboard(`Курс = ${rate}\n${shopName}:\n${rentCount} прокат(а/ов) — ${rentProfit}р\n\nПродажи:\n${getSalesList(sales)} \nЖелезо — ${hardware}р\nИтого: ${allAmount}р (${allAmountUsd}$)\n`)

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
    );
  }

  if (hardware) {
    setClipboard(`Курс = ${rate} \n${shopName}:\n${rentCount} прокат(а/ов) — ${rentProfit}р\nЖелезо — ${hardware}\nИтого: ${allAmount}р ( ${allAmountUsd} $)\n`)

    return (
      <div className="report__container">
        Курс = {rate} <br/>
        {shopName}:<br/>
        {rentCount} прокат(а/ов) — {rentProfit}р<br/>
        Железо — {hardware}<br/>
        Итого: {allAmount}р ( {allAmountUsd} $)<br/>
      </div>)

  }

  if (sales.length) {
    setClipboard(`Курс = ${rate}\n${shopName}:\n${getSalesList(sales)}\nИтого: ${allAmount}р ( ${allAmountUsd} $)\n`)

    return (
      <div className='report__container'>
        Курс = {rate} <br/>
        {shopName}:<br/>
        {rentCount} прокат(а/ов) — {rentProfit}р<br/> <br/>
        Продажи:
        {renderSales(sales)} <br/>
        Итого: {allAmount}р ({allAmountUsd}$)<br/>
      </div>
    )
  }

  if (!rentCount) {
    setClipboard(`---> !rentCount`)

    return (
      <div className="report__container">
        {shopName}: 0<br/>
      </div>
    )
  }


  //todo

  // setClipboard(`Курс = ${rate}\n${shopName}:\n${rentCount} прокат(а/ов) — ${allAmount}р (${allAmountUsd}$)`)
  setClipboard(`---> end`)

  return (
    <div className="report__container">
      Курс = {rate} <br/>
      {shopName}:<br/>
      {rentCount} прокат(а/ов) — {allAmount}р ({allAmountUsd}$)
    </div>
  )
}

//todo commit if all working

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
    {itemName: "Profit P. 10mm", price: 0, count: 0, checkbox: false},
    {itemName: "Plantronics St. 2mm", price: 150, count: 1, checkbox: false},
    {itemName: "Plantronics St. 4mm", price: 0, count: 0, checkbox: false},
    {itemName: "Plantronics P. 2mm", price: 0, count: 0, checkbox: false},
    {itemName: "Plantronics P. 4mm", price: 0, count: 0, checkbox: false},
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
