import "./SearchBar.scss";
// import { useRef } from "react";

function SearchBar({inputRef, handleSearch}) {

    return (
        <>
            <form>
                <input onChange={handleSearch} name="searchInput" ref={inputRef} className="" placeholder="Search by Kirtan, Name, Album"></input>
            </form>
        </>
    )
}

export default SearchBar;