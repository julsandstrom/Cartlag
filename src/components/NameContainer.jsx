const NameContainer = ({ nameValue }) => {
  return (
    <div className="name-container ">
      {nameValue ? (
        <h2 className="hello-name">Hi {nameValue}!</h2>
      ) : (
        <h2 className="hello-name">
          <span className="lag-color hello">Hello </span> Guest!
        </h2>
      )}
    </div>
  );
};

export default NameContainer;
