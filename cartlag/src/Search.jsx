const Search = ({ Search, onSearch }) => {
  return (
    <div>
      <label htmlFor="search">Search</label>
      <input id="search" type="text" value={Search} onChange={onSearch} />
    </div>
  );
};
export default Search;
