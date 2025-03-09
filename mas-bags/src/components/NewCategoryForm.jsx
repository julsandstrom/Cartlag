const NewCategoryForm = ({
  onhandleNewCategorySave,
  newCategory,
  setNewCategory,
  setNewInputValue,
  newInputValue,
  onSelectedUnit,
  onSetSelectedUnit,
  formPosition,
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
            Custom name
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="new-name-input "
            />
          </label>

          <label className="new-category-value">
            Value
            <input
              type="number"
              step={0.1}
              placeholder=""
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
