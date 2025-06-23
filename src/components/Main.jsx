import React, {useEffect, useState} from "react";
import AddSoldDevicesForm from "./AddSoldDevicesForm.jsx";
import SoldDevicesList from "./SoldDevicesList.jsx";
import RentForm from "./RentForm.jsx";
import generateReportArray from "../utils/generateReportArray.js";

export default function Main() {
  const formState = {
    rentCost: 15,
    rate: 2.99,
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
  const [isGenerated, setIsGenerated] = useState(false);

  const [clipboard, setClipboard] = useState([])

  useEffect(() => {
    setIsGenerated(false)
    setClipboard([])
  }, [formData, soldDevices]);

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

  const removeSoldDevice = (id) => {
    setSoldDevices(prevState => prevState.filter((_, index) => index !== id))
  }


  const handleCopyBtnClick = () => {
    navigator.clipboard.writeText(clipboard.join('')).then()
  }

  return (
    <main>
      <RentForm
        formData={formData}
        onChange={handleChange}
      />

      <AddSoldDevicesForm
        formData={soldDevicesForm}
        onChange={soldDevicesHandle}
        onSubmit={addSoldDevice}
      />

      {soldDevices.length > 0 && (
        <SoldDevicesList
          devices={soldDevices}
          onRemove={removeSoldDevice}
        />
      )}

      <button
        className="generate-button"
        onClick={() => {
          setClipboard([... generateReportArray(formData, soldDevices)])
          setIsGenerated(true)

        }}

      >
        Generate Report
      </button>


      {isGenerated &&
        <div className="main__report report">
          {clipboard.length > 0 &&
            <pre className="report__container">
              {clipboard.join('')}
          </pre>
          }
          <button
            className="report__button"
            onClick={handleCopyBtnClick}
          >Copy
          </button>
        </div>}


    </main>
  );
}
