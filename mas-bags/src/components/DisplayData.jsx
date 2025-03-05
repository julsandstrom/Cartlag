import fakeBrandAPI from "./fakeBrandApi";
import { useState } from "react";
import BrandsModal from "./BrandsModal.jsx";

const DisplayData = ({ bodyParts, handleClick }) => {
  const [brandData, setBrandData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [brandMatches, setBrandMatches] = useState([]);

  const findBrands = async (part) => {
    const result = await fakeBrandAPI({ [part]: bodyParts[part] });
    // alert(`Brands matching your ${part}: ${result.join(", ")}`);
    setBrandMatches(result);
    setBrandData({ part, brands: result });
    setShowModal(true);
    console.log(showModal);
  };
  const closeModal = () => {
    setShowModal(false);
    setBrandData(null);
  };

  return (
    <div>
      <ul className="data-summary">
        <h2 className="summary-text">Summary:</h2>
        {Object.entries(bodyParts).map(([part, data]) => (
          <li key={part} className="list-data" onClick={handleClick}>
            {data.value ? (
              <div className="list-items">
                <span id={part} className=" summary-parts">
                  {" "}
                  {part}:
                </span>{" "}
                {data.value} {data.unit}
                <div className="find-brand" onClick={() => findBrands(part)}>
                  Find Brands
                </div>
              </div>
            ) : (
              ""
            )}
          </li>
        ))}
      </ul>
      {showModal && brandData && (
        <BrandsModal
          showModal={showModal}
          closeModal={closeModal}
          brandMatches={brandMatches}
        />
      )}
    </div>
  );
};

export default DisplayData;
