import fakeBrandAPI from "./fakeBrandApi";
import { useState, useEffect } from "react";
import BrandsModal from "./BrandsModal.jsx";

const DisplayData = ({
  bodyParts,
  handleClick,
  setSelectedPart,
  selectedPart,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [brandMatches, setBrandMatches] = useState([]);

  const findBrands = async (part, event) => {
    event.stopPropagation();

    handleClick({ target: { id: part } });
    setSelectedPart(part);

    console.log("Updated selectedPart:", part);

    const result = await fakeBrandAPI({ [part]: bodyParts[part] });
    setBrandMatches(result);

    setShowModal(true);
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

  return (
    <div>
      <ul className="data-summary">
        <h2 className="summary-text">Summary:</h2>
        {Object.entries(bodyParts).map(([part, data]) => (
          <li key={part} className="list-data" onClick={handleClick}>
            {data.value ? (
              <div className="list-items">
                <span id={part} className="summary-parts">
                  {part}:
                </span>{" "}
                {data.value} {data.unit}
                <div
                  className="find-brand"
                  onClick={(e) => findBrands(part, e)}
                >
                  Find Brands
                </div>
              </div>
            ) : null}
          </li>
        ))}
      </ul>

      {showModal && selectedPart && (
        <BrandsModal
          showModal={showModal}
          closeModal={closeModal}
          brandMatches={brandMatches}
          part={selectedPart}
        />
      )}
    </div>
  );
};

export default DisplayData;
