const NameContainer = ({
  nameAdded,
  nameValue,
  setNameValue,
  saveName,
  handleNameEdit,
  isEditingName,
  selectedColor,
  handlePrimaryColorChange,
}) => {
  return (
    <div style={{ minHeight: "30px" }} className="name-container">
      {nameAdded & !isEditingName ? (
        <div className="edit-name">
          <p className="hello-name">
            <span className="lag-color">Hello</span> {nameValue}!
          </p>
          {/* <button className="button-text" onClick={handleNameEdit}>
            Change Name
          </button>

          <input
            type="color"
            className="color-input"
            value={selectedColor}
            onChange={(e) => handlePrimaryColorChange(e.target.value)}
          /> */}
        </div>
      ) : (
        <div>
          {!isEditingName ? (
            <div className="edit-name">
              <p className="hello-name">
                <span className="lag-color">Hello</span> {nameValue}!
              </p>
              <button className="button-text" onClick={handleNameEdit}>
                edit name
              </button>

              <input
                type="color"
                className="color-input"
                value={selectedColor}
                onChange={(e) => handlePrimaryColorChange(e.target.value)}
              />
            </div>
          ) : (
            <div className="edit-name">
              <form>
                <label className="new-name">
                  <span className="lag-color">Enter</span> name:{"  "}
                  <input
                    type="text"
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                    className="value-input"
                  />
                </label>
                <button className="button-text" onClick={(e) => saveName(e)}>
                  Save
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NameContainer;
