import SelectedInput from "./SelectedInput";
import SelectGreeting from "./SelectGreeting";

const FormInput = ({
  onHandleSave,
  onSelectedPart,
  onInputValue,
  onSetInputValue,
  onSelectedUnit,
  handleDelete,
}) => {
  return (
    <>
      <SelectGreeting onSelectedPart={onSelectedPart} />
      {onSelectedPart && (
        <>
          <SelectedInput
            onSelectedPart={onSelectedPart}
            onInputValue={onInputValue}
            onSetInputValue={onSetInputValue}
            onHandleSave={onHandleSave}
            handleDelete={handleDelete}
            onSelectedUnit={onSelectedUnit}
          />
        </>
      )}{" "}
    </>
  );
};
export default FormInput;
