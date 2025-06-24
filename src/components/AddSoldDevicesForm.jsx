import DeviceSelectGroup from "./DeviceSelectGroup";

export default function AddSoldDevicesForm({formData, onChange, onSubmit}) {
  return (
    <form className="form_sold-devices" onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}>
      <label className="form__label">Add Sold Devices</label>
      <DeviceSelectGroup form={formData} onChange={onChange}/>
      <button className='button button_add-sold-device' type="submit">
        Add Sold Device
      </button>
    </form>
  );
}
