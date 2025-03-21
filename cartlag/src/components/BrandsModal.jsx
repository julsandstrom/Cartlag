const Modal = ({ showModal, closeModal, brandMatches, part }) => {
  if (!showModal) return null;
  return (
    <div className="brand-modal-overlay" onClick={closeModal}>
      <div className="brand-modal-content" onClick={closeModal}>
        <h2 className="recommend-title">
          Recommended Brands and sizes for {part}
        </h2>
        {brandMatches.length > 0 ? (
          <ul className="brand-list-modal">
            {brandMatches.map((brand, index) => (
              <li key={index} className="brand-border">
                {brand}
              </li>
            ))}
          </ul>
        ) : (
          <p>No matches found. </p>
        )}
      </div>
    </div>
  );
};

export default Modal;
