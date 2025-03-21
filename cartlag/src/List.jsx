import Item from "./Item";

const List = ({ list, onRemoveItem }) => {
  return (
    <ul>
      {list.map(({ objectID, ...item }) => (
        <Item key={objectID} {...item} onRemoveItem={onRemoveItem} />
      ))}
    </ul>
  );
};

export default List;
