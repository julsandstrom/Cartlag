const Item = ({ title, author, onRemoveItem }) => {
  return (
    <>
      <li>{title}</li>
      <li>{author}</li>
      <span>
        <button type="button" onClick={onRemoveItem}>
          Dismiss
        </button>
      </span>
    </>
  );
};

export default Item;
