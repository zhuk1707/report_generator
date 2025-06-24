import React, {useEffect, useState} from "react";
import AddSoldDevicesForm from "./AddSoldDevicesForm.jsx";
import SoldDevicesList from "./SoldDevicesList.jsx";
import RentForm from "./RentForm.jsx";
import generateReportArray from "../utils/generateReportArray.js";
import Report from "./Report.jsx";

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
      [name]: type === "number" ? value : value
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


  return (
    <main>
      <RentForm
        formData={formData}
        onChange={handleChange}
      />

      <section className="sold-devices-section">
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
      </section>

      <button
        className="button_generate-report"
        onClick={() => {
          setClipboard([...generateReportArray(formData, soldDevices)])
          setIsGenerated(true)
        }}
      >
        Generate Report
      </button>

      {isGenerated &&
        <Report clipboard={clipboard}/>
      }

    </main>
  );
}
