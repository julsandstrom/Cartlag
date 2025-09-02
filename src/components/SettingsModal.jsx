import { useState, useRef, useEffect } from "react";
import EditProfile from "./EditProfile";
// import { HexColorPicker } from "react-colorful";
// import ChangeName from "./ChangeName";
import { X } from "lucide-react";
import { ArrowLeft } from "lucide-react";
function SettingsModal({
  handleReset,
  selectedColor,
  handlePrimaryColorChange,
  closeSettings,
  changeNameProps,
  handleImport,
  handleDownload,
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [changingColor, setChangingColor] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const modalRef = useRef(null);
  const offset = useRef({ x: 0, y: 0 });

  const handleStart = (e) => {
    if (e.target.closest(".no-drag")) return;
    setDragging(true);

    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;

    offset.current = {
      x: clientX - position.x,
      y: clientY - position.y,
    };
  };

  const handleMove = (e) => {
    if (!dragging) return;

    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;

    setPosition({
      x: clientX - offset.current.x,
      y: clientY - offset.current.y,
    });

    e.preventDefault();
  };

  const handleEnd = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleMove, { passive: false });
      document.addEventListener("touchend", handleEnd);
    } else {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [dragging]);

  return (
    <div
      ref={modalRef}
      className="modal-overlay"
      onMouseDown={handleStart}
      onTouchStart={handleStart}
      style={{
        position: "fixed",
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: dragging ? "grabbing" : "grab",
        touchAction: "none",
        userSelect: "none",
        zIndex: 9999,
      }}
    >
      <div className="menu-button-container">
        {editProfile ? (
          <button
            onClick={() => setEditProfile(false)}
            className="settings-return"
          >
            <ArrowLeft />
          </button>
        ) : (
          <div className="drag-handle" />
        )}
        <button
          onClick={closeSettings}
          className="close-settings-button text-white"
        >
          <X />
        </button>
      </div>

      <div onClick={(e) => e.stopPropagation()}>
        {editProfile ? (
          <EditProfile
            changingColor={changingColor}
            selectedColor={selectedColor}
            handlePrimaryColorChange={handlePrimaryColorChange}
            showConfirm={showConfirm}
            setChangingColor={setChangingColor}
            changeNameProps={changeNameProps}
            setShowConfirm={setShowConfirm}
          />
        ) : (
          <>
            {" "}
            <div className="list-button-container">
              <button
                onClick={() => setEditProfile(true)}
                className="list-button"
              >
                Edit Profile
              </button>
            </div>
            <div
              className="import-profile-container no-drag"
              onClick={() => document.querySelector(".import-json").click()}
            >
              <button className="import-profile-button">Import Profile</button>
              <input
                type="file"
                accept="application/json"
                placeholder="Import"
                onChange={handleImport}
                className="import-json"
              />
            </div>
            <div className="list-button-container no-drag">
              <button onClick={handleDownload} className="list-button">
                Download Profile
              </button>
            </div>
          </>
        )}

        {showConfirm && (
          <div className="confirm">
            <p className="verification-delete">
              You want to delete your profile?
            </p>
            <div className="verify-buttons">
              <button onClick={handleReset} className="yes-delete">
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="no-delete"
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingsModal;
