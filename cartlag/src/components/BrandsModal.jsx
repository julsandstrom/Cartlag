const Modal = ({ showModal, setShowModal, brandMatches, part }) => {
  if (!showModal) return null;
  return (
    <div className="brand-modal-overlay" onClick={() => setShowModal(false)}>
      <div className="brand-modal-content" onClick={() => setShowModal(false)}>
        <h2 className="recommend-title">
          Recommended brands and sizes for: {part}
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
