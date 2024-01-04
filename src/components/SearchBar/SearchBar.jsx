import "./SearchBar.scss";
// import Form from "react-bootstrap/Form";
// import { Col } from "react-bootstrap";
import CloseButton from "../../assets/images/close-line-icon.png";

function SearchBar({ inputRef, handleSearch, resetSearch, urlSearchString }) {
  // searchHistory
  //   console.log("searchHistory", searchHistory);
  return (
    <div className="searchbar">
      <form className="searchbar__form">
        <input
          name="searchInput"
          ref={inputRef}
          className="searchbar__input"
          placeholder="Search by Shabad, Sevadar or Samagam"
          // value={urlSearchString}
          defaultValue={urlSearchString !== null ? `${urlSearchString}` : ""}
          onChange={handleSearch}
        ></input>
        <img
          src={CloseButton}
          alt="clear search"
          className="searchbar__close-button"
          onClick={resetSearch}
        ></img>
      </form>
    </div>
  );
}

export default SearchBar;
