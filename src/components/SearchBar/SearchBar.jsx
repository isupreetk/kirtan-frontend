import "./SearchBar.scss";
import CloseButton from "../../assets/images/close-line-icon.png";
import { Link } from "react-scroll";

function SearchBar({ inputRef, handleSearch, resetSearch, urlSearchString }) {
  return (
    <div className="searchbar">
      <form className="searchbar__form">
        <Link
          to="search-bar"
          spy={true}
          smooth={true}
          duration={1000}
          className="searchbar__link"
        >
          <input
            name="searchInput"
            ref={inputRef}
            className="searchbar__input"
            placeholder="Search by Shabad, Sevadar or Samagam"
            defaultValue={urlSearchString !== null ? `${urlSearchString}` : ""}
            onChange={handleSearch}
            id="search-bar"
          ></input>
        </Link>
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
