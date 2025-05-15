import Form from "./Form";
import SalesItem from "./SalesItem";
import GeneratedReport from "./GeneratedReport";
import React from "react";
import {formInputDataFormat, RENT_COST, salesItems} from "../data";

export default function Main() {
  const [formInputs, setFormInputs] = React.useState(formInputDataFormat)
  const [salesItemInputs, setSalesItemInputs] = React.useState(salesItems)

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
    <main className='main'>
      <div>Rent Cost = {RENT_COST}</div>
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
  )
}