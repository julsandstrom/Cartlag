import { useState, useEffect } from "react";

import SummaryModal from "./SummaryModal.jsx";

const DisplayData = ({
  bodyParts,
  setInputValue,
  handleClick,
  selectedPart,
  showSummary,
  setShowSummary,
  secondaryColor,
  selectedColor,
  initialBodyParts,
  nameValue,

  findBrands,
}) => {
  const [positions, setPositions] = useState({});

  useEffect(() => {
    const updatePositions = () => {
      const mannequin = document.querySelector(".cartlag-doll");
      if (!mannequin) return;

      const mannequinRect = mannequin.getBoundingClientRect();
      const newPositions = {};

      Object.keys(bodyParts).forEach((part) => {
        const element = document.getElementById(part);
        if (element) {
          const rect = element.getBoundingClientRect();

          newPositions[part] = {
            top: rect.top - mannequinRect.top + rect.height / 2,
            left: rect.left - mannequinRect.left + rect.width / 2,
          };
        }
      });

      setPositions(newPositions);
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    window.addEventListener("scroll", updatePositions);

    return () => {
      window.removeEventListener("resize", updatePositions);
      window.removeEventListener("scroll", updatePositions);
    };
  }, [bodyParts]);

  return (
    <>
      <div className="measurement-overlay">
        {Object.entries(bodyParts)
          .filter(([part]) => Object.keys(initialBodyParts).includes(part))
          .map(([part, data]) =>
            data.value ? (
              <span
                key={part}
                className="measurement-label"
                style={{
                  position: "absolute",
                  top: positions[part]?.top || 0,
                  left: positions[part]?.left || 0,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={(e) => {
                  const clickedPart =
                    e.target.getAttribute("data-part") || part;
                  handleClick({ target: { id: clickedPart } });
                }}
              >
                {data.value} {data.unit}
              </span>
            ) : null
          )}
      </div>

      {showSummary && (
        <SummaryModal
          showModal={showSummary}
          secondaryColor={secondaryColor}
          selectedColor={selectedColor}
          setShowSummary={setShowSummary}
          nameValue={nameValue}
        >
          {Object.entries(bodyParts).filter(([_, data]) => data.value).length >
            18 && <p className="limit-message">Max data reached. Well done!</p>}

          {Object.values(bodyParts).some((data) => data.value) ? (
            <ul className="data-summary">
              {Object.entries(bodyParts)
                .filter(([_, data]) => data.value)
                .slice(0, 16)
                .map(([part, data]) => (
                  <li
                    key={part}
                    className={`list-data ${
                      selectedPart === part ? "selected" : ""
                    }`}
                  >
                    <span
                      className="summary-parts"
                      data-part={part}
                      style={{ marginRight: "8px" }}
                      onClick={(e) => {
                        const clickedPart =
                          e.target.getAttribute("data-part") || part;
                        handleClick({ target: { id: clickedPart } });
                      }}
                    >
                      {part}:
                    </span>
                    {data.value}
                    {data.unit}
                  </li>
                ))}
            </ul>
          ) : (
            <p className="no-data-text">No data available</p>
          )}
        </SummaryModal>
      )}
    </>
  );
};

export default DisplayData;
