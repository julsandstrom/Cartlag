const SelectGreeting = ({ onSelectedPart, showSummary, setShowSummary }) => {
  return (
    <form className={`data-form ${onSelectedPart ? "hidden" : "active"}`}>
      <label>
        {onSelectedPart ? (
          ``
        ) : (
          <div className="select-body-header">
            <span className="select-text">Select </span> a body part
            {/* <button className="save-button " onClick={onInfoClick}>
          Info
        </button> */}
            <button
              className="summary-button"
              type="button"
              onClick={() => setShowSummary(!showSummary)}
            >
              Summary
            </button>
          </div>
        )}{" "}
      </label>
    </form>
  );
};

export default SelectGreeting;
