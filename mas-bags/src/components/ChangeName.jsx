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
    <>
      {!isEditingName ? (
        <div className="edit-name">
          <button className="button-text-name" onClick={handleNameEdit}>
            Change Name
          </button>
        </div>
      ) : (
        <form className="change-name-container">
          <label className="new-name">
            <h6>Enter name: </h6>
          </label>
          <input
            type="text"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            className="value-input-name"
          />

          <button className="button-text" onClick={(e) => saveName(e)}>
            Save
          </button>
        </form>
      )}
    </>
  );
};

export default ChangeName;
