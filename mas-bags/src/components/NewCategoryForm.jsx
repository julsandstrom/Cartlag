const NewCategoryForm = ({
  onhandleNewCategorySave,
  newCategory,
  setNewCategory,
  setNewInputValue,
  newInputValue,
  onSelectedUnit,
  onSetSelectedUnit,
  formPosition,
  placeholderMessage,
}) => {
  return (
    <>
      <div
        className="new-category-section"
        style={{
          position: "absolute",
          top: `${formPosition.top}px`,
          left: `${formPosition.left}px`,
        }}
      >
        <form onSubmit={onhandleNewCategorySave} className="new-category-form">
          <label className="new-category-name">
            Label{" "}
            {placeholderMessage && <p className="error-text">empty field!</p>}
            <input
              type="text"
              placeholder="type here"
              value={newCategory}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (/^[A-Za-z\s]*$/.test(inputValue)) {
                  setNewCategory(inputValue);
                }
              }}
              className="new-name-input "
            />
          </label>

          <label className="new-category-value">
            Measurement{" "}
            {placeholderMessage && <p className="error-text">empty field!</p>}
            <input
              type="number"
              step={0.1}
              placeholder="type here"
              className="new-value-input"
              value={newInputValue}
              onChange={(e) => setNewInputValue(e.target.value)}
            />
          </label>
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

          <button type="submit" className="new-category-button">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default NewCategoryForm;
