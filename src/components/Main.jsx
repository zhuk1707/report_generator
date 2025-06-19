import React, {useState} from "react";

export default function Main() {
  const formState = {
    rentCost: 15,
    rate: 0,
    shopName: 'mv',
    rentCount: 0,
    hardware: 0
  };

  const soldDevicesFormState = {
    deviceName: 'golf',
    deviceType: 'st',
    deviceSize: 'nano',
    isUsed: false,
    deviceCost: 0
  };

  const [formData, setFormData] = useState(formState);
  const [soldDevicesForm, setSoldDevicesForm] = useState(soldDevicesFormState);
  const [soldDevices, setSoldDevices] = useState([])

  const handleChange = (e) => {
    const {name, type, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? +value : value
    }));
  };

  const soldDevicesHandle = (e) => {
    const {name, type, value, checked} = e.target;
    setSoldDevicesForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const addSoldDevice = () => {
    setSoldDevices((prevState) =>
      [...prevState, soldDevicesForm]
    )
  }

  return (
    <main>
      <form className="form">
        <label htmlFor="rentCost" className="form__label">Rent Cost</label>
        <input
          className="form__input"
          type="number"
          placeholder="Rent cost"
          name="rentCost"
          id="rentCost"
          value={formData.rentCost}
          onChange={handleChange}
        />

        <label htmlFor="rate" className="form__label">Rate</label>
        <input
          className="form__input"
          type="number"
          placeholder="USD to BYN rate"
          name="rate"
          id="rate"
          value={formData.rate}
          onChange={handleChange}
        />

        <label htmlFor="shopSelect" className="form__label">Shop name</label>
        <select
          name="shopName"
          id="shopSelect"
          value={formData.shopName}
          onChange={handleChange}
          className="form__select"
        >
          <option value="mv">МВ</option>
          <option value="almi">АЛМИ</option>
        </select>

        <label htmlFor="rentCount" className="form__label">Rent count</label>
        <input
          className="form__input"
          type="number"
          placeholder="Overall rents count"
          name="rentCount"
          id="rentCount"
          value={formData.rentCount}
          onChange={handleChange}
        />

        <label htmlFor="hardware" className="form__label">Hardware earnings</label>
        <input
          className="form__input"
          type="number"
          placeholder="Hardware earnings (optional)"
          name="hardware"
          id="hardware"
          value={formData.hardware}
          onChange={handleChange}
        />
      </form>

      <hr/>

      <form className="form">
        <label className="form__label">Add Sold Devices</label>
        <div className="inline-form">
          <select
            name="deviceName"
            id="deviceSelect"
            value={soldDevicesForm.deviceName}
            onChange={soldDevicesHandle}
            className="inline-form__input"
          >
            <option value="golf">Golf</option>
            <option value="profit">Profit</option>
            <option value="plantronics">Plantronics</option>
          </select>

          <select
            name="deviceType"
            id="deviceTypeSelect"
            value={soldDevicesForm.deviceType}
            onChange={soldDevicesHandle}
            className="inline-form__input"
          >
            <option value="st">St.</option>
            <option value="p">P.</option>
          </select>

          <select
            name="deviceSize"
            id="deviceSizeSelect"
            value={soldDevicesForm.deviceSize}
            onChange={soldDevicesHandle}
            className="inline-form__input"
          >
            <option value="nano">2mm</option>
            <option value="ultra">4mm</option>
            <option value="mikro">10mm</option>
          </select>

          <div className="used-checkbox">
            <label htmlFor="isUsed">
              <input
                id="isUsed"
                type="checkbox"
                name="isUsed"
                checked={soldDevicesForm.isUsed}
                onChange={soldDevicesHandle}
              />
              used
            </label>
          </div>

          <input
            className="inline-form__input"
            type="number"
            placeholder="Cost"
            name="deviceCost"
            id="deviceCost"
            value={soldDevicesForm.deviceCost}
            onChange={soldDevicesHandle}
          />
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            addSoldDevice()
            console.log(soldDevices)
          }}
        >
          Add Sold Device
        </button>
      </form>

      <hr/>

      <div className="form__label">Sold Devices</div>
      {soldDevices.map((el) => {
        return (<div className='sold-device__item'>
          <span>{el.deviceName}</span>
          <span>{el.deviceType}</span>
          <span>{el.deviceSize}</span>
          <span>{el.isUsed && 'new'}</span>
          <span>{el.deviceCost}</span>
        </div>)
      })}
      <hr/>

      <button
        className="generate-button"
        onClick={() => {
          console.log(formData);
        }}
      >
        Generate
      </button>
    </main>
  );
}
