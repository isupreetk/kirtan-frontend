import "./SearchBar.scss";
import Form from "react-bootstrap/Form";

function SearchBar({ inputRef, handleSearch }) {
  // searchHistory
  //   console.log("searchHistory", searchHistory);
  return (
    <>
      <Form.Control
        size="sm"
        type="text"
        name="searchInput"
        ref={inputRef}
        placeholder="Search by Kirtan, Name, Album"
        onChange={handleSearch}
        // className="md-6"
      />
      {/* <form> */}
      {/* onSubmit={(event) => handleSearch(event)} */}
      {/* <input
          name="searchInput"
          ref={inputRef}
          className="searchbar"
          placeholder="Search by Kirtan, Name, Album"
          onChange={handleSearch}
        ></input> */}
      {/* <button>Search</button> */}
      {/* </form> */}
    </>
  );
}

export default SearchBar;
