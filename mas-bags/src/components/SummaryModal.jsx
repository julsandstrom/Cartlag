import CartlagDoll from "./CartlagDoll";
const SummaryModal = ({
  showModal,
  closeModal,
  secondaryColor,
  selectedColor,
  nameValue,
  children,
}) => {
  if (!showModal) return null;
  const getFormattedDate = () => {
    const today = new Date();
    return new Intl.DateTimeFormat("sv-SE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(today);
  };

  return (
    <>
      <div className="modal-overlay-summary" onClick={closeModal}>
        <div className="logotype logotype-summary">
          <img
            src="src\assets\logotype.svg"
            alt="Cartlag Logo"
            className="logo logotype-card"
          />
        </div>{" "}
        <h1 className="summary-name">{nameValue}</h1>
        <CartlagDoll
          className="cartlag-doll-summary"
          secondaryColor={secondaryColor}
          selectedColor={selectedColor}
        />
        <div
          className="modal-content-summary"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>{" "}
        <p className="current-date">{getFormattedDate()}</p>
      </div>
    </>
  );
};

export default SummaryModal;
