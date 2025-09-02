const NameContainer = ({ nameValue }) => {
  return (
    <div className="text-2xl md:text-4xl xl:text-5xl text-[#F5F5F5]">
      {!nameValue === "Guest" && (
        <h2 className="">
          Hi <span className="font-bold">{nameValue}</span>!
        </h2>
      )}
    </div>
  );
};

export default NameContainer;
