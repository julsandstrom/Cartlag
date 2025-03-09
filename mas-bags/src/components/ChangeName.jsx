import { useState } from "react";
import { Pen } from "lucide-react";
import { Check } from "lucide-react";
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
    <div>
      {!isEditingName ? (
        <div className="list-button-container no-drag">
          <button className="list-button" onClick={handleNameEdit}>
            <Pen />
            Change Name
          </button>
        </div>
      ) : (
        <form className="new-profile-container no-drag">
          <label className="new-profile-name">Enter name:</label>

          <input
            type="text"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            className="new-profile-input "
          />

          <button
            style={{ backgroundColor: "#93ABD3", color: "white" }}
            className="list-button"
            onClick={(e) => saveName(e)}
          >
            Save Name
          </button>
        </form>
      )}
    </div>
  );
};

export default ChangeName;
