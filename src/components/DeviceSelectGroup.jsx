export default function DeviceSelectGroup({form, onChange}) {
  return (
    <form className="inline-form">
      <select
        name="deviceName"
        value={form.deviceName}
        onChange={onChange}
        className="inline-form__input"
      >
        <option value="golf">Golf</option>
        <option value="profit">Profit</option>
        <option value="plantronics">Plantronics</option>
      </select>

      <select
        name="deviceType"
        value={form.deviceType}
        onChange={onChange}
        className="inline-form__input"
      >
        <option value="st">St.</option>
        <option value="p">P.</option>
      </select>

      <select
        name="deviceSize"
        value={form.deviceSize}
        onChange={onChange}
        className="inline-form__input"
      >
        <option value="nano">2mm</option>
        <option value="ultra">4mm</option>
        <option value="mikro">10mm</option>
      </select>

      <div className="used-checkbox">
        <input
          type="checkbox"
          id="isUsed"
          name="isUsed"
          checked={form.isUsed}
          onChange={onChange}
        />
        <label htmlFor="isUsed"> used </label>

      </div>

      <input
        className="inline-form__input"
        type="number"
        placeholder="Cost"
        name="deviceCost"
        value={form.deviceCost}
        onChange={onChange}
      />
    </form>
  );
}
