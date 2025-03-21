import fakeBrandAPI from "./fakeBrandApi";
import { useState, useEffect } from "react";
import BrandsModal from "./BrandsModal.jsx";
import SummaryModal from "./SummaryModal.jsx";

const DisplayData = ({
  bodyParts,
  handleClick,
  setSelectedPart,
  selectedPart,
  showSummary,
  setShowSummary,
  secondaryColor,
  selectedColor,
  initialBodyParts,
  nameValue,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [brandMatches, setBrandMatches] = useState([]);
  const [positions, setPositions] = useState({});

  const findBrands = async (part, event) => {
    event.stopPropagation();
    handleClick({ target: { id: part } });
    setSelectedPart(part);

    const result = await fakeBrandAPI({ [part]: bodyParts[part] });
    setBrandMatches(result);
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (selectedPart) {
      (async () => {
        const result = await fakeBrandAPI({
          [selectedPart]: bodyParts[selectedPart],
        });
        setBrandMatches(result);
      })();
    }
  }, [selectedPart]);

  const closeModal = () => {
    setShowModal(false);
    setSelectedPart(null);
  };

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
                onClick={(e) => findBrands(part, e)}
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
          closeModal={() => setShowSummary(false)}
          nameValue={nameValue}
        >
          {Object.entries(bodyParts).filter(([_, data]) => data.value).length >
            18 && <p className="limit-message">Max data reached. Well done!</p>}

          {Object.values(bodyParts).some((data) => data.value) ? (
            <ul className="data-summary">
              {Object.entries(bodyParts)
                .filter(([_, data]) => data.value)
                .slice(0, 18)
                .map(([part, data]) => (
                  <li
                    key={part}
                    className={`list-data ${
                      selectedPart === part ? "selected" : ""
                    }`}
                    onClick={(e) => {
                      if (!e.target.closest(".find-brand")) {
                        handleClick({ target: { id: part } });
                      }
                    }}
                  >
                    <span className="summary-parts">{part}</span>
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

      {showModal && selectedPart && (
        <BrandsModal
          showModal={showModal}
          closeModal={closeModal}
          brandMatches={brandMatches}
          part={selectedPart}
        />
      )}
    </>
  );
};

export default DisplayData;
