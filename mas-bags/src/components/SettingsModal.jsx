import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import ChangeName from "./ChangeName";

function SettingsModal({
  handleReset,
  selectedColor,
  handlePrimaryColorChange,
  closeSettings,
  changeNameProps,
  handleImport,
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
        <div
          className="import-profile-container"
          onClick={() => document.querySelector(".import-json").click()}
        >
          {" "}
          <label className="import-profile-text">Import Profile</label>
          <input
            type="file"
            accept="application/json"
            placeholder="Import"
            onChange={handleImport}
            className="import-json"
            style={{ display: "none" }}
          />
        </div>
        {!showConfirm && (
          <>
            <ChangeName
              nameValue={changeNameProps.nameValue}
              setNameValue={changeNameProps.setNameValue}
            />

            <button
              onClick={() => setShowConfirm(!showConfirm)}
              className="button-text-delete"
            >
              Delete Profile
            </button>
          </>
        )}

        {showConfirm && (
          <div className="confirm">
            <p className="verification-delete">
              Are you sure you want to delete your profile?
            </p>
            <button onClick={handleReset} className="danger">
              Yes
            </button>
            <button
              style={{ marginLeft: "40px" }}
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
