import "./App.css";

import { useState, useEffect, useRef } from "react";
import "@fontsource/jost/400.css";
import "@fontsource/jost/700.css";

import CartlagDoll from "./components/CartlagDoll";
import SelectGreeting from "./components/SelectGreeting";
import SelectedInput from "./components/SelectedInput";

import html2canvas from "html2canvas";
import DisplayData from "./components/DisplayData";
import NameContainer from "./components/NameContainer";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import chroma from "chroma-js";
import SettingsModal from "./components/SettingsModal";
import NewCategoryForm from "./components/NewCategoryForm";

const initialBodyParts = {
  Head: { value: "", unit: "cm" },
  Neck: { value: "", unit: "cm" },
  Chest: { value: "", unit: "cm" },
  Shoulder: { value: "", unit: "cm" },
  Arms: { value: "", unit: "cm" },
  Hands: { value: "", unit: "cm" },
  Waist: { value: "", unit: "cm" },
  Hip: { value: "", unit: "cm" },
  Thigh: { value: "", unit: "cm" },
  Legs: { value: "", unit: "cm" },
  Feet: { value: "", unit: "cm" },
};

function App() {
  const [selectedPart, setSelectedPart] = useState(null);
  const [bodyParts, setBodyParts] = useState(initialBodyParts);
  const [inputValue, setInputValue] = useState("");
  const [newInputValue, setNewInputValue] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("mm");
  const [highlightedPart, setHighlightedPart] = useState(null);

  const [nameValue, setNameValue] = useState("Guest");

  const [showPopup, setShowPopup] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#d49769");
  const [secondaryColor, setSecondaryColor] = useState("#c29477");
  const [showSettings, setShowSettings] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [formPosition, setFormPosition] = useState({ top: 0, left: 0 });
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
    function updateFormPosition() {
      if (dollRef.current) {
        const rect = dollRef.current.getBoundingClientRect();
        setFormPosition({
          top: rect.top + window.scrollY + 10,
          left: rect.left + window.scrollX,
        });
      }
    }

    updateFormPosition();

    window.addEventListener("resize", updateFormPosition);
    window.addEventListener("scroll", updateFormPosition);

    return () => {
      window.removeEventListener("resize", updateFormPosition);
      window.removeEventListener("scroll", updateFormPosition);
    };
  }, [dollRef]);
  const handleDelete = () => {
    if (selectedPart) {
      const updatedParts = {
        ...bodyParts,
        [selectedPart]: { ...bodyParts[selectedPart], value: "" },
      };
      setBodyParts(updatedParts);
      setInputValue("");
      localStorage.setItem("cartlagData", JSON.stringify(updatedParts));
      setSelectedPart(null);
      setHighlightedPart(null);
    }
  };

  useEffect(() => {
    if (!selectedPart) {
      setHighlightedPart(null);
    }
  }, [selectedPart]);

  const handleSave = (e, part = selectedPart) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!part) return;
    // if (inputValue.length <= 0) return;
    if (inputValue.length > 5) return;
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
  };

  const handleNewCategorySave = (e) => {
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
    localStorage.setItem("showSummary", "true");
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

  useEffect(() => {
    if (Object.values(bodyParts).some((part) => part.value !== "")) {
      localStorage.setItem("cartlagData", JSON.stringify(bodyParts));
    }
  }, [bodyParts]);

  const handleDownload = async () => {
    setSelectedPart(null);
    setShowSummary(true);

    setTimeout(async () => {
      const cardRef = document.querySelector(".modal-overlay-summary");

      if (cardRef) {
        const canvas = await html2canvas(cardRef, {
          backgroundColor: "#242424",
        });
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = `${nameValue}_Cartlag_Measurements.png`;
        link.click();
      }

      const jsonData = JSON.stringify({
        name: nameValue,
        measurements: bodyParts,
        color: selectedColor,
        secondaryColor: secondaryColor,
        date: new Date().toLocaleDateString(),
        version: "1.0.0",
      });

      const jsonBlob = new Blob([jsonData], { type: "application/json" });
      const jsonLink = document.createElement("a");
      jsonLink.href = URL.createObjectURL(jsonBlob);
      jsonLink.download = `${nameValue}_Cartlag_Profile.json`;
      jsonLink.click();
    }, 300);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const importedData = JSON.parse(event.target.result);
      setBodyParts(importedData.measurements);
      setNameValue(importedData.name);
      setSecondaryColor(importedData.secondaryColor);
      setSelectedColor(importedData.color);
      // setShowSummary(true);

      // 🔥 Tiny Scroll Trick to Force Reflow
      setTimeout(() => {
        window.scrollBy(0, 1); // Scroll down 1px
        window.scrollBy(0, -1); // Scroll back up 1px
      }, 50); // Delay to ensure state updates first
    };
    reader.readAsText(file);
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
  };

  return (
    <>
      {showSettings && (
        <SettingsModal
          handleReset={handleReset}
          selectedColor={selectedColor}
          handlePrimaryColorChange={handlePrimaryColorChange}
          closeSettings={closeSettings}
          changeNameProps={changeNameProps}
          handleImport={handleImport}
          handleDownload={handleDownload}
        />
      )}
      <div className="page-layout">
        <Modal
          showModal={showModal}
          closeModal={closeModal}
          selectedPart={selectedPart}
        />
        <div className="nav-section">
          <Navbar handleSettingsClick={handleSettingsClick} />
        </div>

        {showPopup && (
          <div className="popup">
            <h3 className="popup-text">Measurements saved ✅</h3>
          </div>
        )}
        <NameContainer nameValue={nameValue} />
        <>
          <div className="selection-greeting">
            <SelectGreeting
              onSelectedPart={selectedPart}
              showSummary={showSummary}
              setShowSummary={setShowSummary}
            />
            {selectedPart && (
              <>
                <SelectedInput
                  onSelectedPart={selectedPart}
                  onInputValue={inputValue}
                  onSetInputValue={setInputValue}
                  onHandleSave={handleSave}
                  handleDelete={handleDelete}
                  onSelectedUnit={selectedUnit}
                />
              </>
            )}
          </div>{" "}
          <NewCategoryForm
            onhandleNewCategorySave={handleNewCategorySave}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            setNewInputValue={setNewInputValue}
            newInputValue={newInputValue}
            onSelectedUnit={selectedUnit}
            onSetSelectedUnit={setSelectedUnit}
            formPosition={formPosition}
          />
        </>
        <div ref={dollRef} className="cartlag-wrapper">
          <DisplayData
            setSelectedPart={setSelectedPart}
            bodyParts={bodyParts}
            handleClick={handleClick}
            selectedPart={selectedPart}
            showSummary={showSummary}
            setShowSummary={setShowSummary}
            selectedColor={selectedColor}
            secondaryColor={secondaryColor}
            initialBodyParts={initialBodyParts}
            nameValue={nameValue}
          />

          <CartlagDoll
            handleClick={handleClick}
            className="cartlag-doll"
            highlightedPart={highlightedPart}
            selectedColor={selectedColor}
            secondaryColor={secondaryColor}
          />
        </div>
        {/* </section> */}
        {/* <div className="download-button">
        {" "}
        <button onClick={handleDownload}>Download</button>
      </div> */}

        {/*  */}
        {/*  */}
        {/* <div>
        <h3 className="slogan-text">We believe that your size is your data</h3>
      
      </div> */}
      </div>{" "}
      <img
        src="src\background.jpg"
        alt="image of waste"
        className="main-image"
      />
      <div className="project-by-container">
        {" "}
        <span className="project-by">Project by</span>
        <h4>Julian Sandström</h4>
      </div>
    </>
  );
}

export default App;
