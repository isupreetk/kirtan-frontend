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
  let [possibleCombinations, setPossibleCombinations] = useState([]);
  let newArray = [];
  let arrayCombinations = [];

  useEffect(() => {
    getSearchCombinations(searchArray);
  }, [searchArray]);

  useEffect(() => {
    setKirtans(kirtansData);
  }, [possibleCombinations]);

  const getSearchCombinations = (searchArray) => {
    // console.log("searchTerm", searchTerm);
    // console.log("searchArray1", searchArray);
    // console.log("possibleCombinations1", possibleCombinations);
    let newLength = searchArray.length - 1;
    // console.log("newLength", newLength);

    if (newLength >= 0) {
      for (let i = 0; i <= searchArray.length - 1; i++) {
        newArray = searchArray.slice(0, newLength + 1);
        arrayCombinations.push(newArray);
        setPossibleCombinations(arrayCombinations);
        newLength--;
      }
    }
  };

  const handleSearch = () => {
    setSearchTerm(inputRef.current.value);
    setSearchArray(inputRef.current.value.split(" "));
  };

  return (
    <div className="App">
      <Header />
      <SearchBar inputRef={inputRef} handleSearch={handleSearch} />
      <KirtanList
        searchTerm={searchTerm}
        possibleCombinations={possibleCombinations}
        kirtans={kirtans}
      />
    </div>
  );
}

export default App;
