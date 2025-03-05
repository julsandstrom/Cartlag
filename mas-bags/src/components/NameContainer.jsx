const NameContainer = ({ nameValue }) => {
  return (
    <div className="name-container edit-name">
      {nameValue ? (
        <h2 className="hello-name">
          <span className="lag-color">Hello</span> {nameValue}!
        </h2>
      ) : (
        <h2 className="hello-name">
          <span className="lag-color">Hello </span>Guest!
        </h2>
      )}
    </div>
  );
};

export default NameContainer;
