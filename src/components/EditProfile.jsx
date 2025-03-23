import ChangeName from "./ChangeName";
import { HexColorPicker } from "react-colorful";
import { Palette } from "lucide-react";
import { Trash2 } from "lucide-react";
const EditProfile = ({
  changingColor,
  selectedColor,
  handlePrimaryColorChange,
  showConfirm,
  setChangingColor,
  changeNameProps,
  setShowConfirm,
}) => {
  return (
    <>
      {" "}
      {changingColor && (
        <HexColorPicker
          color={selectedColor}
          onChange={handlePrimaryColorChange}
          className="color-picker no-drag"
        />
      )}
      {!showConfirm && (
        <>
          {" "}
          <div className="list-button-container no-drag">
            {!changingColor ? (
              <button
                onClick={() => setChangingColor(true)}
                className="list-button"
              >
                <Palette />
                Change Color
              </button>
            ) : (
              <>
                {" "}
                <button
                  onClick={() => setChangingColor(false)}
                  className="list-button close-color-button"
                >
                  Close Color Editor
                </button>
              </>
            )}
          </div>
          <ChangeName
            nameValue={changeNameProps.nameValue}
            setNameValue={changeNameProps.setNameValue}
          />
          <div className="list-button-container no-drag">
            <button
              onClick={() => setShowConfirm(!showConfirm)}
              className="list-button"
            >
              <Trash2 />
              Delete Profile
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default EditProfile;
