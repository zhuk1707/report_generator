import './App.css';
import React from "react";
import Form from "./components/Form";
import SalesItem from "./components/SalesItem";
import GeneratedReport from "./components/Foo";



function App() {
  const [formInputs, setFormInputs] = React.useState({
    rate: '',
    shopName: "almi",
    rentCount: '',
    hardware: ''
  })

  const [salesItemInputs, setSalesItemInputs] = React.useState([
    {itemName: "Profit St. 2mm", price: 0, count: 0, checkbox: false},
    {itemName: "Profit St. 4mm", price: 0, count: 0, checkbox: false},
    {itemName: "Profit St. 10mm", price: 0, count: 0, checkbox: false},
    {itemName: "Profit P. 2mm", price: 0, count: 0, checkbox: false},
    {itemName: "Profit P. 4mm", price: 0, count: 0, checkbox: false},
    {itemName: "Profit P. 10mm", price: 0, count: 0, checkbox: false},
    {itemName: "Plantronics St. 2mm", price: 0, count: 0, checkbox: false},
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
