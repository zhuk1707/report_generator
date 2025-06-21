import FormInput from "./FormInput";

export default function RentForm({formData, onChange}) {
  return (
    <form className="form">
      <FormInput
        label="Rent Cost"
        name="rentCost"
        value={formData.rentCost}
        onChange={onChange}
        type="number"
        placeholder="Rent cost"
      />
      <FormInput
        label="Rate"
        name="rate"
        value={formData.rate}
        onChange={onChange}
        type="number"
        placeholder="USD to BYN rate"
      />
      <label htmlFor="shopSelect" className="form__label">Shop name</label>
      <select
        name="shopName"
        id="shopSelect"
        value={formData.shopName}
        onChange={onChange}
        className="form__select"
      >
        <option value="mv">МВ</option>
        <option value="almi">АЛМИ</option>
      </select>
      <FormInput
        label="Rent count"
        name="rentCount"
        value={formData.rentCount}
        onChange={onChange}
        type="number"
        placeholder="Overall rents count"
      />
      <FormInput
        label="Hardware earnings"
        name="hardware"
        value={formData.hardware}
        onChange={onChange}
        type="number"
        placeholder="Hardware earnings (optional)"
      />
    </form>
  );
}
