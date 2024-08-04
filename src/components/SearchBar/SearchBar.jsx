import "./SearchBar.scss";
import CloseButton from "../../assets/images/close-line-icon.png";

function SearchBar({ inputRef, handleSearch, resetSearch, urlSearchString }) {
  const searchScroll = () => {
    window.scrollTo(0, 250);
  };

  return (
    <div className="searchbar">
      <form className="searchbar__form">
        <input
          name="searchInput"
          ref={inputRef}
          className="searchbar__input"
          placeholder="Search by Shabad, Sevadar or Samagam"
          defaultValue={urlSearchString !== null ? `${urlSearchString}` : ""}
          onChange={handleSearch}
          onClick={searchScroll}
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
