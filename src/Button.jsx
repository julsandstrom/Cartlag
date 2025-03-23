const RadioButton = ({ label, value, onChange, name }) => {
  return (
    <div>
      <label>
        <input type="radio" name={name} checked={value} onChange={onChange} />
        {label}
      </label>
    </div>
  );
};
export default RadioButton;
