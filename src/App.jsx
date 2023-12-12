import "./App.scss";
import { useRef, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import KirtanList from "./components/KirtanList/KirtanList";
import kirtansData from "./assets/data/randomisedKirtan.json";
// import searchHistoryData from "./assets/data/searchHistory.json";
// import InfiniteScroll from "react-infinite-scroll-component";
import PaginationComponent from "./components/Pagination/Pagination";
import { Container, Row, Col } from "react-bootstrap";

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

  // let [items, setItems] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(null);
  let [currentPage, setCurrentPage] = useState(1);
  let [entriesPerPage] = useState(100);

  // let [searchHistory, setSearchHistory] = useState(searchHistoryData);
  // let [searchHistory, setSearchHistory] = useState([]);

  // console.log("kirtanTitleRef", kirtanTitleRef.current);

  const getAllSubsets = (searchArray) => {
    searchArray = searchArray.filter((s) => s !== "");
    let sortedCombinations = searchArray
      .reduce(
        (subsets, value) =>
          subsets.concat(subsets.map((set) => [value, ...set])),
        [[]]
      )
      .sort((a, b) => {
        // console.log("a", a);
        // console.log("b", b);
        return b.length - a.length;
      });
    return sortedCombinations;
  };

  // console.log("getAllSubsets", getAllSubsets(["naam", "simran"]));

  const getSortedKirtans = (data) => {
    let sortedData = data.sort((a, b) => {
      return b.Score - a.Score;
    });
    setSortedKirtans(sortedData);
  };

  const calculateScore = (kirtan) => {
    kirtan.Score = 0;

    for (let i = 0; i <= possibleCombinations?.length - 1; i++) {
      let array = possibleCombinations[i];
      let arrayLength = array.length;
      let searchExists = true;
      if (arrayLength === 0) continue;
      array.forEach((element) => {
        if (
          !(
            kirtan.Title.toLowerCase().includes(element.toLowerCase()) ||
            kirtan.Sevadar.toLowerCase().includes(element.toLowerCase()) ||
            kirtan.Album.toLowerCase().includes(element.toLowerCase())
          )
        ) {
          searchExists = false;
        }
      });
      kirtan.hTitle = kirtan.Title;
      kirtan.hSevadar = kirtan.Sevadar;
      kirtan.hAlbum = kirtan.Album;
      if (searchExists) {
        kirtan.Score = arrayLength;
        array.forEach((word) => {
          kirtan.hTitle = kirtan.hTitle
            ?.toLowerCase()
            .replace(
              word?.toLowerCase(),
              `<strong>${word.toLowerCase()}</strong>`
            );
          kirtan.hSevadar = kirtan.hSevadar
            ?.toLowerCase()
            .replace(
              word?.toLowerCase(),
              `<strong>${word.toLowerCase()}</strong>`
            );
          kirtan.hAlbum = kirtan.hAlbum
            ?.toLowerCase()
            .replace(
              word?.toLowerCase(),
              `<strong>${word.toLowerCase()}</strong>`
            );
        });

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
    // getSearchCombinations(searchArray);
    // console.log("getAllSubsets(searchArray)", getAllSubsets(searchArray));
    // console.log("(searchArray)", searchArray);

    setPossibleCombinations(getAllSubsets(searchArray));
  }, [searchArray]);

  useEffect(
    () => {
      setIsLoading(true);
      setError(false);
      setKirtans(kirtansData);
      setFilteredKirtans(
        kirtans.filter((kirtan) => {
          return calculateScore(kirtan);
        })
      );
      setIsLoading(false);
    },
    // eslint-disable-next-line
    [possibleCombinations]
  );

  useEffect(() => {
    getSortedKirtans(filteredKirtans);
  }, [filteredKirtans]);

  // const getSearchCombinations = (searchArray) => {
  //   let newLength = searchArray.length - 1;
  //   if (newLength >= 0) {
  //     for (let i = 0; i <= searchArray.length - 1; i++) {
  //       newArray = searchArray.slice(0, newLength + 1);
  //       arrayCombinations.push(newArray);
  //       newLength--;
  //     }
  //     setPossibleCombinations(arrayCombinations);
  //   }
  // };

  // const postSearchHistory = () => {};

  const handleSearch = () => {
    // event.preventDefault();
    setSearchTerm(inputRef.current.value);
    setSearchArray(inputRef.current.value.split(" "));
    setCurrentPage(1); //this is to bring back to page 1 for every new search

    // searchHistory.push(inputRef.current.value);
  };

  // Get Current Kirtans
  let indexOfLastKirtan = currentPage * entriesPerPage;
  let indexOfFirstKirtan = indexOfLastKirtan - entriesPerPage;
  let currentKirtans = searchTerm
    ? sortedKirtans.slice(indexOfFirstKirtan, indexOfLastKirtan)
    : kirtans.slice(indexOfFirstKirtan, indexOfLastKirtan);

  // Get Page
  const paginate = (event, pageNumber) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <Container fluid className="App">
      <Row>
        <Header />
      </Row>
      <Container>
        <Row className="p-4">
          <Col xs={1} md={2}></Col>
          <Col md={8} xs={10} className="p-0">
            <SearchBar
              inputRef={inputRef}
              handleSearch={handleSearch}
              // searchHistory={searchHistory}
            />
          </Col>
          <Col xs={1} md={2}></Col>
        </Row>
        <Row className="align-items-center">
          <KirtanList
            searchTerm={searchTerm}
            kirtans={currentKirtans}
            sortedKirtans={currentKirtans}
            isLoading={isLoading}
            error={error}
            // kirtanTitle={kirtanTitle}
            // kirtanTitleRef={kirtanTitleRef}
          />
        </Row>
        <PaginationComponent
          entriesPerPage={entriesPerPage}
          totalKirtans={searchTerm ? sortedKirtans.length : kirtans.length}
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Container>
    </Container>
  );
}

export default App;
