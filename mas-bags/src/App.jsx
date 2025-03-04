import "./App.css";

import { useState, useEffect, useRef } from "react";
import FormInput from "./components/FormInput";
import Check from "./components/Check";

import html2canvas from "html2canvas";
import DisplayData from "./components/DisplayData";
import NameContainer from "./components/NameContainer";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import chroma from "chroma-js";
import SettingsModal from "./components/SettingsModal";
function App() {
  const [selectedPart, setSelectedPart] = useState(null);
  const [bodyParts, setBodyParts] = useState({
    Head: { value: "", unit: "cm" },
    Neck: { value: "", unit: "cm" },
    Chest: { value: "", unit: "cm" },
    Shoulder: { value: "", unit: "cm" },
    Arms: { value: "", unit: "cm" },
    Hands: { value: "", unit: "mm" },
    Waist: { value: "", unit: "cm" },
    Hip: { value: "", unit: "cm" },
    Thigh: { value: "", unit: "cm" },
    Legs: { value: "", unit: "cm" },
    Feet: { value: "", unit: "EU" },
  });
  const [inputValue, setInputValue] = useState("");
  const [newInputValue, setNewInputValue] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("mm");
  const [highlightedPart, setHighlightedPart] = useState(null);

  const [nameValue, setNameValue] = useState("Guest");

  // const [isEditingName, setIsEditingName] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#d49769");
  const [secondaryColor, setSecondaryColor] = useState("#c29477");
  const [showSettings, setShowSettings] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const handlePrimaryColorChange = (newColor) => {
    setSelectedColor(newColor);
    setSecondaryColor(chroma(newColor).brighten(0.8).hex());
  };
  const dollRef = useRef(null);
  const handleClick = (event) => {
    const part = event.target.id;

    setSelectedPart((prev) => (prev !== part ? part : null));

    setHighlightedPart(part);
    setInputValue(bodyParts[part]?.value || "");
    setSelectedUnit(bodyParts[part]?.unit || "mm");
  };

  useEffect(() => {
    if (!selectedPart) {
      setHighlightedPart(null);
    }
  }, [selectedPart]);

  const handleSave = (e) => {
    e.preventDefault();
    // if (inputValue.length <= 0) return;
    setHighlightedPart(null);
    if (selectedPart) {
      const updatedParts = {
        ...bodyParts,
        [selectedPart]: { value: inputValue, unit: selectedUnit },
      };
      setBodyParts(updatedParts);
      localStorage.setItem("cartlagData", JSON.stringify(updatedParts));

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
    setInputValue("");
    setNewInputValue("");
    setSelectedPart(null);
    setShowSummary(true);
  };

  const handleNewCategorySave = (e) => {
    setShowSummary(true);
    e.preventDefault();
    if (newInputValue.length <= 0) return;
    setHighlightedPart(null);
    setSelectedPart(null);

    const updatedParts = {
      ...bodyParts,
      [newCategory]: { value: newInputValue, unit: selectedUnit },
    };

    setBodyParts(updatedParts);
    setInputValue("");
    setNewInputValue("");
    setNewCategory("");
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  useEffect(() => {
    const savedName = localStorage.getItem("cartlagName");
    const savedData = localStorage.getItem("cartlagData");
    const savedColor = localStorage.getItem("cartlagColor");
    const savedSecondaryColor = localStorage.getItem("cartlagSecondaryColor");
    if (savedName) {
      setNameValue(savedName);
    }
    if (savedData) {
      setBodyParts(JSON.parse(savedData));
    }
    if (savedColor) {
      setSelectedColor(savedColor);
    }
    if (savedSecondaryColor) {
      setSecondaryColor(savedSecondaryColor);
    }
  }, []);

  // const saveName = (e) => {
  //   e.preventDefault();
  //   if (nameValue.length <= 0) return;
  //   localStorage.setItem("cartlagName", nameValue);
  //   setNameAdded(false);
  //   // setIsEditingName(false);
  // };
  // const handleNameEdit = () => {
  //   console.log("clicked");
  //   setIsEditingName(true);
  // };

  useEffect(() => {
    if (Object.values(bodyParts).some((part) => part.value !== "")) {
      localStorage.setItem("cartlagData", JSON.stringify(bodyParts));
    }
  }, [bodyParts]);

  const handleDownload = async () => {
    setSelectedPart(null);
    if (dollRef.current && !selectedPart) {
      const canvas = await html2canvas(dollRef.current, {
        backgroundColor: "#242424",
      });
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `${nameValue}_Cartlag_Measurements.png`;
      link.click();
    }
  };

  const handleInfoClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (selectedColor) {
      localStorage.setItem("cartlagColor", selectedColor);
      localStorage.setItem("cartlagSecondaryColor", secondaryColor);
      console.log("Color Saved:", secondaryColor);
    }
  }, [selectedColor, secondaryColor]);

  const handleReset = () => {
    setSelectedColor("#d49769");
    setSecondaryColor("#c29477");
    setNameValue("Guest");

    const resetData = Object.keys(bodyParts).reduce((acc, part) => {
      acc[part] = { unit: bodyParts[part].unit, value: "" };
      return acc;
    }, {});
    setBodyParts(resetData);
    setShowSettings(false);
    localStorage.clear();
    // window.location.reload();
    setShowSummary(false);
  };

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  const changeNameProps = {
    nameValue,
    setNameValue,
    // saveName,
    // handleNameEdit,
    // isEditingName,
  };

  return (
    <div className="project-div">
      {showSettings && (
        <SettingsModal
          handleReset={handleReset}
          selectedColor={selectedColor}
          handlePrimaryColorChange={handlePrimaryColorChange}
          closeSettings={closeSettings}
          changeNameProps={changeNameProps}
        />
      )}
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        selectedPart={selectedPart}
      />
      <Navbar />

      {showPopup && <div className="popup">Measurements saved ✅</div>}
      <NameContainer
        nameValue={nameValue}
        setNameValue={setNameValue}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        handlePrimaryColorChange={handlePrimaryColorChange}
      />

      <section className="main-layout">
        <div className="instruction">
          <FormInput
            onHandleSave={handleSave}
            onSelectedPart={selectedPart}
            onInputValue={inputValue}
            onSetInputValue={setInputValue}
            setNewInputValue={setNewInputValue}
            newInputValue={newInputValue}
            onSelectedUnit={selectedUnit}
            onSetSelectedUnit={setSelectedUnit}
            onhandleNewCategorySave={handleNewCategorySave}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            onInfoClick={handleInfoClick}
          />
        </div>

        {/*  */}
        <div
          ref={dollRef}
          className="card-layout"
          style={{ backgroundColor: "#242424" }}
        >
          {/* <h1>
            CART
            <span className="lag-color">LAG</span>
          </h1> */}
          <div className="doll-summary">
            <Check
              handleClick={handleClick}
              className="cartlag-doll"
              highlightedPart={highlightedPart}
              selectedColor={selectedColor}
              secondaryColor={secondaryColor}
            />
            {showSummary && (
              <DisplayData bodyParts={bodyParts} handleClick={handleClick} />
            )}
          </div>
        </div>
      </section>
      <div className="download-button">
        {" "}
        <button onClick={handleDownload}>Download Profile</button>
        <button className="reset-button" onClick={handleSettingsClick}>
          Settings
        </button>
      </div>

      {/*  */}
      <img
        src="src\background.jpg"
        alt="image of waste"
        className="main-image"
      />
      <h3 className="slogan-text">One measurement is better than guessing</h3>
      <h4>Project by Julian Sandstrom</h4>
    </div>
  );
}

export default App;
