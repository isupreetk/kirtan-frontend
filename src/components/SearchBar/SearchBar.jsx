import "./SearchBar.scss";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import CloseButton from "../../assets/images/close-line-icon.png";

function SearchBar({ inputRef, handleSearch, resetSearch }) {
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
      />
      <img
        src={CloseButton}
        alt="clear search"
        className="search__close-button"
        onClick={resetSearch}
      ></img>
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
