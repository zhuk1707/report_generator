import React from "react";

export default function SalesItem({index, inputs, setInputs, setIsGenerated}) {
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
      <div className="options__item">
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
      </div>



      <div className="options__item">
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
      </div>

      <div className="options__item">
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
      </div>

      <div className="options__item">
        <button
          className='options__button options__button_clear'
          type="button"
          title='Clear all'
          onClick={handleClearClick}
        >✕
        </button>
      </div>
    </form>
  </div>
}