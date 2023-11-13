import "./SearchBar.scss";
// import { useRef } from "react";

function SearchBar({formRef, handleSearch}) {

    // const formRef = useRef();

    // const handleSearch = (event) => {
    //     event.preventDefault();
    //     let searchTerm = event.target.searchInput.value;
    //     // console.log(searchTerm);
    //     formRef.current.reset();
    // }

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