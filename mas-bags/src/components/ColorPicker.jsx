const ColorPicker = ({ selectedColor, setSelectedColor }) => {
  return (
    <>
      <input
        type="color"
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
      />
    </>
  );
};

export default ColorPicker;
