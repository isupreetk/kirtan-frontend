import "./SearchBar.scss";
// import { useRef } from "react";

function SearchBar({formRef, handleSearch}) {

    return (
        <>
            <form ref={formRef} onSubmit={handleSearch}>
                <input name="searchInput" className="" placeholder="Search by Kirtan, Name, Album"></input>
                <button>Search</button>
            </form>
        </>
    )
}

export default SearchBar;