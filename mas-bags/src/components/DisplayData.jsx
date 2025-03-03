const DisplayData = ({ bodyParts, handleClick }) => {
  return (
    <ul className="data-summary">
      <h2>Summary:</h2>
      {Object.entries(bodyParts).map(([part, data]) => (
        <li key={part} className="list-data">
          {data.value ? (
            <>
              <span id={part} className="lag-color" onClick={handleClick}>
                {" "}
                {part}:
              </span>{" "}
              {data.value} {data.unit}
            </>
          ) : (
            ""
          )}
        </li>
      ))}
    </ul>
  );
};

export default DisplayData;
