const FormInput = ({
  onHandleSave,
  onSelectedPart,
  onInputValue,
  onSetInputValue,
  onSelectedUnit,
  onSetSelectedUnit,
  onhandleNewCategorySave,
  newCategory,
  setNewCategory,
  onInfoClick,
  setNewInputValue,
  newInputValue,
  stringError,
  handleDelete,
}) => {
  return (
    <>
      <form onSubmit={onHandleSave} className="data-form">
        {stringError && (
          <smaller className="error-message">Empty field error</smaller>
        )}
        <label className="selected-part">
          {onSelectedPart ? (
            ``
          ) : (
            <div className="select-body-header">
              <span className="lag-color">Select</span> a body part
              <button className="save-button " onClick={onInfoClick}>
                Info
              </button>
            </div>
          )}{" "}
        </label>
        {onSelectedPart && (
          <>
            <h6>Selected: </h6>
            <div className="selection">
              <label className="selected-input ">{onSelectedPart}</label>
              <input
                type="number"
                step={0.1}
                placeholder=""
                value={onInputValue}
                onChange={(e) => onSetInputValue(e.target.value)}
                className="value-input"
              />
              <select
                value={onSelectedUnit}
                onChange={(e) => onSetSelectedUnit(e.target.value)}
              >
                <option value="mm">mm</option>
                <option value="cm">cm</option>
                <option value="EU">Shoe size(eu)</option>
                <option value="Kg">Kg</option>
                <option value="Inches">Inches</option>
              </select>
              <button type="submit" className="save-button ">
                Save
              </button>
              <button onClick={handleDelete} className="delete-symbol">
                x
              </button>
            </div>
          </>
        )}{" "}
      </form>
      <div className="new-category-section">
        <h5 className="new-category-title">
          or <span className="lag-color">create</span> a new category:
        </h5>
        <form onSubmit={onhandleNewCategorySave} className="new-category-form">
          <label className="new-category-name">Name</label>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="name-input "
          />
          <label className="new-category-value">Value</label>
          <div className="value-wrapper">
            <input
              type="number"
              step={0.1}
              placeholder=""
              className="new-value-input"
              value={newInputValue}
              onChange={(e) => setNewInputValue(e.target.value)}
            />
            <select
              value={onSelectedUnit}
              onChange={(e) => onSetSelectedUnit(e.target.value)}
              className="new-category-select"
            >
              <option value="mm">mm</option>
              <option value="cm">cm</option>
              <option value="EU">Shoe size(eu)</option>
              <option value="Kg">Kg</option>
              <option value="Inches">Inches</option>
            </select>
          </div>
          <button type="submit" className="new-category-button">
            Save
          </button>
        </form>
      </div>
    </>
  );
};
export default FormInput;
