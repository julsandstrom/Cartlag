const SelectedInput = ({
  onSelectedPart,
  onInputValue,
  onSetInputValue,
  onHandleSave,
  handleDelete,
  onSelectedUnit,
}) => {
  const inputFlex = window.innerWidth > 1200 ? 70 : 44;
  return (
    <div className="selection-output-container">
      <div className="selection-input-unit">
        <label className="selected-part ">{onSelectedPart}</label>
        {/*  */}
        <input
          type="number"
          placeholder=""
          value={onInputValue}
          onChange={(e) => onSetInputValue(e.target.value)}
          className="value-input"
        />
        <div value="cm" className="unit-value">
          {" "}
          {onSelectedUnit}
        </div>
      </div>
      {/*  */}
      <div className="selection-save-delete-button">
        <button onClick={onHandleSave} className="save-button ">
          save
        </button>
        <button onClick={handleDelete} className="delete-button">
          delete
        </button>
      </div>
    </div>
  );
};

export default SelectedInput;
