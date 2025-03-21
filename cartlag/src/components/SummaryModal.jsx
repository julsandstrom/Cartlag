import CartlagDoll from "./CartlagDoll";
import logotype from "../assets/logotype.svg";
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
        <div className="logotype-summary">
          <img src={logotype} alt="Cartlag Logo" className="logotype-card" />
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
//move the logo down. name over the top. date under name
