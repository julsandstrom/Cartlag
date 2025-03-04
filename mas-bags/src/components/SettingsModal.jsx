import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import ChangeName from "./ChangeName";

function SettingsModal({
  handleReset,
  selectedColor,
  handlePrimaryColorChange,
  closeSettings,
  changeNameProps,
}) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="modal-overlay" onClick={closeSettings}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="color-picker">
          <h3>Change Doll Color</h3>
          <HexColorPicker
            color={selectedColor}
            onChange={handlePrimaryColorChange}
          />
        </div>

        {!showConfirm && (
          <>
            <ChangeName
              nameValue={changeNameProps.nameValue}
              setNameValue={changeNameProps.setNameValue}
            />
            {/* <button className="button-text" onClick={handleNameEdit}>
              Change Name
            </button> */}
            <button
              style={{ marginLeft: "20px" }}
              onClick={() => setShowConfirm(!showConfirm)}
            >
              Delete Profile
            </button>
          </>
        )}

        {showConfirm && (
          <div className="confirm" style={{ marginLeft: "50px" }}>
            <p>Are you sure you want to delete your profile?</p>
            <button onClick={handleReset} className="danger">
              Yes
            </button>
            <button
              style={{ marginLeft: "20px" }}
              onClick={() => setShowConfirm(false)}
              className="danger"
            >
              No
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingsModal;
