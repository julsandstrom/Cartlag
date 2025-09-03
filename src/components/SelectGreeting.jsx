const SelectGreeting = ({ onSelectedPart, showSummary, setShowSummary }) => {
  const handleCloseModal = () => {
    setShowSummary(false);
    setTimeout(() => {
      window.scrollBy(0, 1);
      window.scrollBy(0, -1);
    }, 5);
  };

  return (
    <form className={`data-form ${onSelectedPart ? "hidden" : "active"}`}>
      <label>
        {onSelectedPart ? (
          ``
        ) : (
          <div className="select-body-header">
            <span className="select-text">Tap</span>a body part
            {!showSummary ? (
              <button
                className="summary-button"
                type="button"
                onClick={() => setShowSummary(!showSummary)}
              >
                Summary
              </button>
            ) : (
              <button
                className="summary-button"
                type="button"
                onClick={handleCloseModal}
              >
                Close
              </button>
            )}
          </div>
        )}{" "}
      </label>
    </form>
  );
};

export default SelectGreeting;
