const DisplayData = ({ bodyParts, handleClick }) => {
  return (
    <ul className="data-summary">
      <h2>Summary:</h2>
      {Object.entries(bodyParts).map(([part, data]) => (
        <li key={part} className="list-data" onClick={handleClick}>
          {data.value ? (
            <div className="list-items">
              <span id={part} className=" summary-parts">
                {" "}
                {part}:
              </span>{" "}
              {data.value} {data.unit}
            </div>
          ) : (
            ""
          )}
        </li>
      ))}
    </ul>
  );
};

export default DisplayData;
