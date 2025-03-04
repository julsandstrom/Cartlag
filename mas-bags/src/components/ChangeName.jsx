import { useState } from "react";

const ChangeName = ({ nameValue, setNameValue }) => {
  const [isEditingName, setIsEditingName] = useState(false);

  const handleNameEdit = () => {
    console.log("clicked");
    setIsEditingName(true);
  };
  const saveName = (e) => {
    e.preventDefault();
    // if (nameValue.length <= 0) return;
    localStorage.setItem("cartlagName", nameValue);
    setIsEditingName(false);
  };

  return (
    <div style={{ minHeight: "30px" }} className="name-container">
      {!isEditingName ? (
        <div className="edit-name">
          <button className="button-text" onClick={handleNameEdit}>
            Change Name
          </button>
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
  );
};

export default ChangeName;
