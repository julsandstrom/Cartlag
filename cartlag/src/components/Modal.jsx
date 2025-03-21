const Modal = ({ showModal, closeModal, selectedPart }) => {
  return (
    <>
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src="src\measurement-guide.png"
              alt={`How to measure ${selectedPart}`}
              className="modal-image"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
