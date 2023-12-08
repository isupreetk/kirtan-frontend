import "./SearchBar.scss";

function SearchBar({ inputRef, handleSearch, searchHistory }) {
  console.log("searchHistory", searchHistory);
  return (
    <>
      <form onSubmit={(event) => handleSearch(event)}>
        <input
          name="searchInput"
          ref={inputRef}
          className="searchbar"
          placeholder="Search by Kirtan, Name, Album"
        ></input>
        <button>Search</button>
      </form>
    </>
  );
}

export default SearchBar;
