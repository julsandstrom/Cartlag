// import React from "react";
// import "./Modal.css";

const Modal = ({ showModal, closeModal, brandMatches }) => {
  if (!showModal) return null;

  return (
    <div className="brand-modal-overlay" onClick={closeModal}>
      {console.log("HERE IS THE CODE")}
      <div className="brand-modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={closeModal}>
          ✖
        </span>
        <h2>Recommended Brands</h2>
        {brandMatches.length > 0 ? (
          <ul>
            {brandMatches.map((brand, index) => (
              <li key={index} className="brand-list-modal">
                {brand}
              </li>
            ))}
          </ul>
        ) : (
          <p>No matches found.</p>
        )}
      </div>
    </div>
  );
};

export default Modal;
