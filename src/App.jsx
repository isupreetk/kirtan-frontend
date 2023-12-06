import "./App.scss";
import { useRef, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import KirtanList from "./components/KirtanList/KirtanList";
import kirtansData from "./assets/data/sept2023.json";

function App() {
  let inputRef = useRef();
  let [searchTerm, setSearchTerm] = useState("");
  let [searchArray, setSearchArray] = useState([]);
  let [kirtans, setKirtans] = useState([]);
  let possibleCombinations = [];
  let newArray = [];

  useEffect(() => {
    setKirtans(kirtansData);
  }, [searchTerm]);

  const getSearchCombinations = () => {
    let newLength = searchArray.length - 1;
    // let possibleCombinations = [];
    // let newArray = [];

    if (newLength >= 0) {
      for (let i = 0; i <= searchArray.length - 1; i++) {
        newArray = searchArray.slice(0, newLength + 1);
        possibleCombinations.push(newArray);
        newLength--;
        console.log("possibleCombinations", possibleCombinations);
      }
    }
  };

  const handleSearch = () => {
    setSearchTerm(inputRef.current.value);
    setSearchArray(inputRef.current.value.split(" "));
    getSearchCombinations();
  };

  return (
    <div className="App">
      <Header />
      <SearchBar inputRef={inputRef} handleSearch={handleSearch} />
      <KirtanList
        searchTerm={searchTerm}
        // searchArray={searchArray}
        possibleCombinations={possibleCombinations}
        kirtans={kirtans}
      />
    </div>
  );
}

export default App;
