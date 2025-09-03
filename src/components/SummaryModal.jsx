import CartlagDoll from "./CartlagDoll";
import logotype from "../assets/logotype.svg";
const SummaryModal = ({
  showModal,
  setShowSummary,
  secondaryColor,
  selectedColor,
  nameValue,
  showSummary,
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

  const handleCloseModal = () => {
    setShowSummary(false);
    setTimeout(() => {
      window.scrollBy(0, 1);
      window.scrollBy(0, -1);
    }, 5);
  };

  return (
    <>
      <div className="modal-wrapper">
        <div className="modal-overlay-summary" onClick={handleCloseModal}>
          <div className="logotype-summary">
            <img src={logotype} alt="Cartlag Logo" className="logotype-card" />
          </div>{" "}
          <div className="summary-name-date">
            <h1 className="summary-name">{nameValue}</h1>
            <p className="current-date">{getFormattedDate()}</p>
          </div>
          <CartlagDoll
            className="cartlag-doll-summary"
            secondaryColor={secondaryColor}
            selectedColor={selectedColor}
          />
          <div
            className="modal-content-summary py-11"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>{" "}
          <div className=" relative bottom-20 left-64 flex justify-start items-center">
            {" "}
            <span className="text-2xl bg-[#f4dbb1] text-[#232121] px-5 py-2 rounded-xl  transition-all ease-in-out duration-500 hover:text-5xl">
              Close
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryModal;
