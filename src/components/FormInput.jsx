export default function FormInput(
  {
    label, name, value, onChange, type = "text", placeholder
  }) {
  return (
    <>
      <label htmlFor={name} className="form__label">{label}</label>
      <input
        className="form__input"
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
}
