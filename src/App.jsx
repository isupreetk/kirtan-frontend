import "./App.scss";
import { useRef, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import KirtanList from "./components/KirtanList/KirtanList";
import kirtansData from "./assets/data/sept2023.json";
// import searchHistoryData from "./assets/data/searchHistory.json";

function App() {
  let inputRef = useRef();
  // let kirtanTitleRef = useRef([]);
  // let [kirtanTitleRef, setKirtanTitleRef] = useState([]);
  let [searchTerm, setSearchTerm] = useState("");
  let [searchArray, setSearchArray] = useState([]);
  let [kirtans, setKirtans] = useState([]);
  let [possibleCombinations, setPossibleCombinations] = useState([]);
  let [filteredKirtans, setFilteredKirtans] = useState([]);
  let [sortedKirtans, setSortedKirtans] = useState([]);
  // let [searchHistory, setSearchHistory] = useState(searchHistoryData);
  let [searchHistory, setSearchHistory] = useState([]);

  let newArray = [];
  let arrayCombinations = [];

  // console.log("kirtanTitleRef", kirtanTitleRef.current);

  const getSortedKirtans = (data) => {
    let sortedData = data.sort((a, b) => {
      return b.Score - a.Score;
    });
    setSortedKirtans(sortedData);
  };

  const calculateScore = (kirtan) => {
    kirtan.Score = 0;

    for (let i = 0; i <= possibleCombinations.length - 1; i++) {
      let array = possibleCombinations[i];
      let arrayLength = array.length;
      let searchExists = true;
      array.forEach((element) => {
        if (
          !(
            kirtan.Title.toLowerCase().includes(element.toLowerCase()) ||
            kirtan.Sevadar.toLowerCase().includes(element.toLowerCase()) ||
            kirtan.Album.toLowerCase().includes(element.toLowerCase())
          )
        ) {
          searchExists = false;
        } else {
          let substring = kirtan.Title.toLowerCase().match(
            element.toLowerCase()
          );
          substring
            ? console.log("substring", substring[0])
            : console.log("No substring");
          // substring.innerHTML = `<p className="substring">${substring}</p>`;
          // kirtanTitleRef = document.getElementById("kirtanTitleRef");
          // console.log("kirtanTitleRef", kirtanTitleRef);
        }
      });
      if (searchExists) {
        kirtan.Score = arrayLength;
        break;
      }
    }
    if (kirtan.Score > 0) {
      return kirtan;
    } else {
      return false;
    }
  };

  useEffect(() => {
    getSearchCombinations(searchArray);
  }, [searchArray]);

  useEffect(() => {
    setKirtans(kirtansData);
    setFilteredKirtans(
      kirtans.filter((kirtan) => {
        return calculateScore(kirtan);
      })
    );
  }, [possibleCombinations]);

  useEffect(() => {
    getSortedKirtans(filteredKirtans);
  }, [filteredKirtans]);

  const getSearchCombinations = (searchArray) => {
    let newLength = searchArray.length - 1;
    if (newLength >= 0) {
      for (let i = 0; i <= searchArray.length - 1; i++) {
        newArray = searchArray.slice(0, newLength + 1);
        arrayCombinations.push(newArray);
        setPossibleCombinations(arrayCombinations);
        newLength--;
      }
    }
  };

  // const postSearchHistory = () => {};

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(inputRef.current.value);
    setSearchArray(inputRef.current.value.split(" "));
    searchHistory.push(inputRef.current.value);
  };

  return (
    <div className="App">
      <Header />
      <SearchBar
        inputRef={inputRef}
        handleSearch={handleSearch}
        searchHistory={searchHistory}
      />
      <KirtanList
        searchTerm={searchTerm}
        // possibleCombinations={possibleCombinations}
        kirtans={kirtans}
        sortedKirtans={sortedKirtans}
        // kirtanTitle={kirtanTitle}
        // kirtanTitleRef={kirtanTitleRef}
      />
    </div>
  );
}

export default App;
