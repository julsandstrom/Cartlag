import "./App.css";

import { useState, useEffect, useRef } from "react";
import "@fontsource/jost/400.css";
import "@fontsource/jost/700.css";
import fakeBrandAPI from "./components/fakeBrandApi.jsx";
import CartlagDoll from "./components/CartlagDoll";
import SelectGreeting from "./components/SelectGreeting";
import SelectedInput from "./components/SelectedInput";

import html2canvas from "html2canvas";
import DisplayData from "./components/DisplayData";
import NameContainer from "./components/NameContainer";

import Navbar from "./components/Navbar";
import chroma from "chroma-js";
import SettingsModal from "./components/SettingsModal";
import NewCategoryForm from "./components/NewCategoryForm";
import BrandsModal from "./components/BrandsModal.jsx";

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
  const [showModal, setShowModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [brandMatches, setBrandMatches] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [bodyParts, setBodyParts] = useState(initialBodyParts);
  const [inputValue, setInputValue] = useState("");
  const [newInputValue, setNewInputValue] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("mm");
  const [highlightedPart, setHighlightedPart] = useState(null);

  const [nameValue, setNameValue] = useState("Guest");

  const [showPopup, setShowPopup] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const [selectedColor, setSelectedColor] = useState("#d49769");
  const [secondaryColor, setSecondaryColor] = useState("#c29477");
  const [showSettings, setShowSettings] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [formPosition, setFormPosition] = useState({ top: 0, left: 0 });
  const [placeholderMessage, setPlaceHolderMessage] = useState(false);
  const [inputMessage, setInputMessage] = useState(false);
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
    if (inputValue.length <= 0) {
      setInputMessage(true);
      setTimeout(() => setInputMessage(false), 3000);
      return;
    }
    if (inputValue.length > 3) return;
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
    if (newInputValue.length <= 0) {
      setPlaceHolderMessage(true);
      setTimeout(() => setPlaceHolderMessage(false), 3000);
      return;
    }
    setHighlightedPart(null);
    setSelectedPart(null);

    const updatedParts = {
      ...bodyParts,
      [newCategory]: { value: newInputValue, unit: selectedUnit },
    };
    setPlaceHolderMessage(false);
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

      setTimeout(() => {
        window.scrollBy(0, 1);
        window.scrollBy(0, -1);
      }, 50);
    };
    reader.readAsText(file);
  };

  const findBrands = async (part, event = null, overrideValue = null) => {
    if (event) event.stopPropagation();

    setSelectedPart(part);

    const dataToSend = {
      [part]: overrideValue || bodyParts[part],
    };

    const result = await fakeBrandAPI(dataToSend);
    setBrandMatches(result);

    setShowModal(true);
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
      {showModal && (
        <BrandsModal
          showModal={showModal}
          setShowModal={setShowModal}
          brandMatches={brandMatches}
          part={selectedPart}
        />
      )}
      <div className="page-layout">
        <div className="nav-section">
          <Navbar handleSettingsClick={handleSettingsClick} />
        </div>
        {showPopup && (
          <div className="popup">
            <h3 className="popup-text">Measurements saved ✅</h3>
          </div>
        )}
        <NameContainer nameValue={nameValue} />
        <div className="selection-greeting-one">
          <SelectGreeting
            onSelectedPart={selectedPart}
            showSummary={showSummary}
            setShowSummary={setShowSummary}
          />
        </div>
        {selectedPart && (
          <div className="selection-greeting">
            <>
              <SelectedInput
                showModal={showModal}
                setShowModal={setShowModal}
                onSelectedPart={selectedPart}
                onInputValue={inputValue}
                onSetInputValue={setInputValue}
                onHandleSave={handleSave}
                handleDelete={handleDelete}
                onSelectedUnit={selectedUnit}
                inputMessage={inputMessage}
                findBrands={findBrands}
              />
            </>
          </div>
        )}
        <NewCategoryForm
          onhandleNewCategorySave={handleNewCategorySave}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          setNewInputValue={setNewInputValue}
          newInputValue={newInputValue}
          onSelectedUnit={selectedUnit}
          onSetSelectedUnit={setSelectedUnit}
          formPosition={formPosition}
          placeholderMessage={placeholderMessage}
        />{" "}
        <div ref={dollRef} className="cartlag-wrapper">
          <DisplayData
            setSelectedPart={setSelectedPart}
            setInputValue={setInputValue}
            bodyParts={bodyParts}
            handleClick={handleClick}
            selectedPart={selectedPart}
            showSummary={showSummary}
            setShowSummary={setShowSummary}
            selectedColor={selectedColor}
            secondaryColor={secondaryColor}
            initialBodyParts={initialBodyParts}
            nameValue={nameValue}
            setShowModal={setShowModal}
            showModal={showModal}
            setBrandMatches={setBrandMatches}
            findBrands={findBrands}
          />

          <CartlagDoll
            handleClick={handleClick}
            className="cartlag-doll"
            highlightedPart={highlightedPart}
            selectedColor={selectedColor}
            secondaryColor={secondaryColor}
          />
        </div>
      </div>{" "}
      <section className="message-section">
        <p className="message-text">
          40% of returns are caused by wrong sizes.
        </p>
        <p className="message-text-2">Cartlag exists to change that.</p>
      </section>
      <div className="project-by-container">
        {" "}
        <span className="project-by">Project by</span>
        <h4>Julian Sandström</h4>
        <a href="mailto:juliiansandstrom@gmail.com">Contact</a>
      </div>
    </>
  );
}

export default App;
