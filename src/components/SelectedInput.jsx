import { useEffect, useState, useRef } from "react";

const SelectedInput = ({
  onSelectedPart,
  onInputValue,
  onSetInputValue,
  onHandleSave,
  handleDelete,
  onSelectedUnit,
  findBrands,
  showModal,
  setShowModal,
}) => {
  const [sliderValue, setSliderValue] = useState(Number(onInputValue) || 100);
  const sliderRef = useRef(null);
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.focus();
    }
  }, [onSelectedPart]);
  useEffect(() => {
    const incomingValue = Number(onInputValue);
    if (!isNaN(incomingValue)) {
      setSliderValue(incomingValue);
    }
  }, [onSelectedPart]);

  useEffect(() => {
    if (!showModal || !onSelectedPart || !onInputValue) return;

    const delay = setTimeout(() => {
      findBrands(onSelectedPart, null, {
        value: onInputValue,
        unit: onSelectedUnit,
      });
    }, 200);

    return () => clearTimeout(delay);
  }, [onInputValue, showModal]);

  const handleSliderChange = (e) => {
    const value = Number(e.target.value);
    setSliderValue(value);
    onSetInputValue(value);
  };

  return (
    <div className="selection-output-container">
      <div className="selection-input-unit">
        <div className="slider-container">
          {" "}
          <div className="part-value-wrap">
            <label className="selected-part">{onSelectedPart}</label>
            <div className="slider-value-display"></div>
          </div>
          <label htmlFor="slider-id"></label>
          <input
            type="range"
            ref={sliderRef}
            min={1}
            max={250}
            value={sliderValue}
            onChange={handleSliderChange}
            className="slider"
            aria-valuemin={1}
            aria-valuemax={250}
            aria-valuenow={sliderValue}
            aria-label={`Adjust ${onSelectedPart} measurement in ${onSelectedUnit}`}
          />{" "}
        </div>
      </div>

      <div className="selection-save-delete-button">
        <button onClick={onHandleSave} className="save-button">
          save
        </button>

        {!showModal ? (
          <button
            className="recommend-button"
            onClick={() =>
              findBrands(onSelectedPart, null, {
                value: onInputValue,
                unit: onSelectedUnit,
              })
            }
          >
            fit tips
          </button>
        ) : (
          <button
            className="recommend-button"
            onClick={() => setShowModal(false)}
          >
            close
          </button>
        )}

        <button onClick={handleDelete} className="delete-button">
          delete
        </button>
      </div>
    </div>
  );
};

export default SelectedInput;
