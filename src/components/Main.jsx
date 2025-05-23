import Form from "./Form";
import SalesItem from "./SalesItem";
import GeneratedReport from "./GeneratedReport";
import React, {useState} from "react";
import {formsInitialState, salesItems} from "../data";
import {ChevronDown, ChevronUp} from 'lucide-react'

export default function Main() {
  const [formInputs, setFormInputs] = React.useState(formsInitialState)
  const [salesItemInputs, setSalesItemInputs] = React.useState(salesItems)
  const [isGenerated, setIsGenerated] = React.useState(false)
  const [isSalesItemsDisplays, setIsSalesItemsDisplays] = useState(false)

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
      <Form labelInfo={'Rent cost'} inputInfo={{name: "rentCost"}} formInputs={formInputs}
            handleChange={handleChange}/>

      <Form labelInfo={'Rate'} inputInfo={{name: "rate"}} formInputs={formInputs}
            handleChange={handleChange}/>

      <Form labelInfo={'Shop name'} isInput={false} selectInfo={{name: "shopName"}} formInputs={formInputs}
            handleChange={handleChange}/>

      <Form labelInfo={'Rent count'} inputInfo={{name: "rentCount"}} formInputs={formInputs}
            handleChange={handleChange}/>
      <Form labelInfo={'Hardware earnings'} inputInfo={{name: "hardware"}} formInputs={formInputs}
            handleChange={handleChange}/>

      <button
        className='main__button sales-item-display-button'
        type='button'
        onClick={() => setIsSalesItemsDisplays(prevState => !prevState)}
      >{isSalesItemsDisplays
        ?
        <><span>Hide</span> <span className='icon'><ChevronUp strokeWidth={1} size={20}/></span></>
        :
        <><span>Show Sales Items</span> <span className='icon'><ChevronDown strokeWidth={1} size={20}/></span></>
      }</button>

      {isSalesItemsDisplays &&
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
      }


      <button
        className='main__button generate-button'
        type='button'
        onClick={handleSubmit}
      >Generate
      </button>

      {isGenerated
        ? <GeneratedReport formInputs={formInputs} salesItemInputs={salesItemInputs}/>
        : null}

    </main>
  )
}