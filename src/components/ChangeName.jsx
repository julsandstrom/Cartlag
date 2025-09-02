import { useState } from "react";
import { Pen } from "lucide-react";

const ChangeName = ({ nameValue, setNameValue }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [error, setError] = useState("");
  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    const cleaned = input.replace(/[^A-Za-zÅÄÖåäö]/g, ""); // Allow Swedish letters
    if (cleaned.length <= 14) {
      setNameValue(cleaned);
      setError("");
    } else {
      setError("Max 14 letters allowed.");
    }
  };

  const saveName = (e) => {
    e.preventDefault();

    if (!nameValue.match(/^[A-Za-zÅÄÖåäö]+$/)) {
      setError("Only letters allowed. No spaces or symbols.");
      return;
    }

    localStorage.setItem("cartlagName", nameValue);
    setIsEditingName(false);
  };
  return (
    <div>
      {!isEditingName ? (
        <div className="list-button-container no-drag">
          <button className="list-button" onClick={handleNameEdit}>
            Change Name
          </button>
        </div>
      ) : (
        <form className="new-profile-container no-drag">
          <label className="new-profile-name">Enter name:</label>

          <input
            type="text"
            value={nameValue}
            onChange={handleInputChange}
            className="new-profile-input "
          />

          <button className="list-button" onClick={(e) => saveName(e)}>
            Save Name
          </button>
        </form>
      )}
    </div>
  );
};

export default ChangeName;
