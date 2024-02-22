import './App.css';

const [goods, setGoods] = [
    "Profit St. New 2mm",
    "Profit St. New 4mm",
    "Profit St. New 10mm",
    "Profit Out. New 2mm",
    "Profit Out. New 4mm",
    "Profit Out. New 10mm"
]

function App() {
  return (
    <div className="App">
      <header className="header">
        Report Generator
      </header>

      <main className='main'>
        <form className='main__form form' action="">
          <label className="form__label" htmlFor="">
            Rate
          </label>
          <input className='form__input' type="text"/>
        </form>

        <form className='main__form form' action="">
          <label className="form__label" htmlFor="">
            Shop name
          </label>
          <select className='form__select'>
            <option value="Almi">ALMI</option>
          </select>
        </form>

        <form className='main__form form' action="">
          <label className="form__label" htmlFor="">
            Rent count
          </label>
          <input className='form__input' type="text"/>
        </form>

        <div className="main__sales sales">
          <SalesItems/>
        </div>


        <button className='main__button generate-button' type='button'>
          Generate
        </button>

        {/*<div className="main__report report">
          Your report will be here
        </div>*/}
      </main>

    </div>
  );
}

function SalesItems() {
  return <div className="sales__item">
    <div className="sales__item-name">Profit st. new 2mm</div>
    <form className="sales__options options">
      <label className="options__name" htmlFor="name">Used</label>
      <input
        type='checkbox'
        className="option__checkbox"
        id="name"
        name="name"
      />

      <div className="options__name">Price</div>
      <button className='options__button options__button_left'>-</button>
      <input type="text" className="options__input" placeholder='150'/>
      <button className='options__button options__button_right'>+</button>

      <div className="options__name">Count</div>
      <button className='options__button options__button_left'>-</button>
      <input type="text" className="options__input" placeholder='0'/>
      <button className='options__button options__button_right'>+</button>
    </form>
  </div>
}

export default App;
