import "./App.scss";
import { useRef, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import GoogleForm from "./components/GoogleForm/GoogleForm";
import KirtanList from "./components/KirtanList/KirtanList";
import kirtansData from "./assets/data/randomisedKirtan.json";
// import searchHistoryData from "./assets/data/searchHistory.json";
// import InfiniteScroll from "react-infinite-scroll-component";
import PaginationComponent from "./components/Pagination/Pagination";
import { Container, Row, Col } from "react-bootstrap";
import ReactGA from "react-ga";

function App() {
  const TRACKING_ID = "G-4R29HH74RE";
  ReactGA.initialize(TRACKING_ID);
  ReactGA.pageview(window.location.pathname + window.location.search);

  let inputRef = useRef();
  // let kirtanTitleRef = useRef([]);
  // let [kirtanTitleRef, setKirtanTitleRef] = useState([]);
  let [searchTerm, setSearchTerm] = useState("");
  let [searchArray, setSearchArray] = useState([]);
  let [possibleCombinations, setPossibleCombinations] = useState([]);

  let [kirtans, setKirtans] = useState([]);
  // let [filteredKirtans, setFilteredKirtans] = useState([]);
  // let [sortedKirtans, setSortedKirtans] = useState([]);
  let [searchedKirtans, setSearchedKirtans] = useState([]);
  let [sortedSearchedKirtans, setSortedSearchedKirtans] = useState([]);

  let [displayKirtans, setDisplayKirtans] = useState([]);
  let [displayAlbumFilterKirtans, setDisplayAlbumFilterKirtans] = useState([]);
  let [allAlbums, setAllAlbums] = useState([]);
  let [allArtists, setAllArtists] = useState([]);
  let [albumFilter, setAlbumFilter] = useState([]);
  let [artistFilter, setArtistFilter] = useState([]);
  let [albumFilteredKirtans, setAlbumFilteredKirtans] = useState([]);
  let [artistFilteredKirtans, setArtistFilteredKirtans] = useState([]);
  let [currentKirtans, setCurrentKirtans] = useState([]);
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

  const handleAlbumFilter = (event) => {
    event.preventDefault();
    albumFilter.push(event.target.innerText);
    // console.log("concatenated", [].concat(albumFilter));
    setAlbumFilter([].concat(albumFilter));
    console.log("AlbumFilter", albumFilter);
    // getAlbumFiltersData(displayKirtans);
  };

  const handleArtistFilter = (event) => {
    event.preventDefault();
    artistFilter.push(event.target.innerText);
    setArtistFilter([].concat(artistFilter));
    console.log("ArtistFilter", artistFilter);
  };

  // const getAlbumArtistFiltersData = (data) => {

  // }

  const getAlbumFiltersData = (data) => {
    console.log("albumFilter in getAlbumFiltersData", albumFilter);
    console.log("data in getAlbumFiltersData", data);
    // albumFilteredKirtans = [];
    albumFilteredKirtans = data.filter((item) => {
      // console.log(item);
      // console.log(albumFilter[0]);
      // console.log(item.Album === albumFilter[0]);
      // console.log("item.Album", item.Album);
      // console.log(
      //   "albumFilter includes data",
      //   albumFilter.includes(item.Album)
      // );
      return albumFilter.includes(item.Album);
    });
    console.log("ddalbumFilter in getAlbumFiltersData", albumFilter);
    console.log("albumFilteredKirtans", albumFilteredKirtans);
    setAlbumFilteredKirtans(albumFilteredKirtans);
    setDisplayKirtans(albumFilteredKirtans);
  };

  const getArtistFiltersData = (data) => {
    let artistFilteredKirtans = data.filter((item) => {
      // console.log(item);
      // console.log(albumFilter[0]);
      // console.log(item.Album === albumFilter[0]);
      return artistFilter.includes(item.Sevadar);
    });
    console.log("ddartistFilter in getArtistFiltersData", artistFilter);
    setDisplayKirtans(artistFilteredKirtans);
  };

  useEffect(() => {
    console.log("albumFilter useEffect", albumFilter);
    console.log("dd", displayKirtans);
    if (albumFilter.length > 0 && artistFilter.length > 0) {
      getAlbumFiltersData(sortedSearchedKirtans);
      getArtistFiltersData(sortedSearchedKirtans);
    } else if (artistFilter.length > 0 && !(albumFilter.length > 0)) {
      getArtistFiltersData(sortedSearchedKirtans);
    } else if (albumFilter.length > 0 && !(artistFilter.length > 0)) {
      getAlbumFiltersData(sortedSearchedKirtans);
    }
  }, [albumFilter, artistFilter]);

  // useEffect(() => {
  //   console.log("artistFilter useEffect", artistFilter);
  //   console.log("artist", displayKirtans);
  //   if (artistFilter.length > 0) {
  //     getArtistFiltersData(displayKirtans);
  //   }
  // }, [artistFilter]);

  const getSortedSearchedKirtans = (data) => {
    console.log("getSortedSearchedKirtans", data);
    let sortedData = data.sort((a, b) => {
      return b.Score - a.Score;
    });
    if (sortedData.length > 0) {
      setSortedSearchedKirtans(sortedData);
      setDisplayKirtans(sortedData);
    }
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
      // setKirtans(kirtansData);
      // setDisplayKirtans(kirtansData);
      setSearchedKirtans(
        kirtans.filter((kirtan) => {
          return calculateScore(kirtan);
        })
      );
      // setFilteredKirtans(
      //   kirtans.filter((kirtan) => {
      //     return calculateScore(kirtan);
      //   })
      // );
      setIsLoading(false);
    },
    // eslint-disable-next-line
    [possibleCombinations]
  );

  useEffect(() => {
    getSortedSearchedKirtans(searchedKirtans);
  }, [searchedKirtans]);

  useEffect(() => {
    allAlbums = [];
    allArtists = [];
    let filterDataSet = [];
    if (searchTerm) {
      filterDataSet = sortedSearchedKirtans;
    } else {
      filterDataSet = displayKirtans;
    }
    // console.log("filterDataSet", filterDataSet);
    // console.log("pre", allAlbums);

    filterDataSet.forEach((kirtan) => {
      if (allAlbums.includes(kirtan.Album)) {
        // continue
      } else if (allArtists.includes(kirtan.Sevadar)) {
      } else {
        // console.log(kirtan.Sevadar);
        allAlbums.push(kirtan.Album);
        allArtists.push(kirtan.Sevadar);
      }
    });
    setAllAlbums(allAlbums);
    console.log("allAlbums", allAlbums);
    setAllArtists(allArtists);
    console.log("allArtists", allArtists);
  }, [sortedSearchedKirtans]);

  useEffect(() => {
    setKirtans(kirtansData);
    setDisplayKirtans(kirtansData);
    setSortedSearchedKirtans(kirtansData);
  }, []);

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
  useEffect(() => {
    // Get Current Kirtans
    let indexOfLastKirtan = currentPage * entriesPerPage;
    let indexOfFirstKirtan = indexOfLastKirtan - entriesPerPage;
    setCurrentKirtans(
      // searchTerm
      //   ? sortedKirtans.slice(indexOfFirstKirtan, indexOfLastKirtan)
      //   : kirtans.slice(indexOfFirstKirtan, indexOfLastKirtan);
      displayKirtans.slice(indexOfFirstKirtan, indexOfLastKirtan)
    );
  }, [displayKirtans, currentPage]);

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
      <GoogleForm />
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
            // kirtans={currentKirtans}
            displayKirtans={currentKirtans}
            // sortedKirtans={currentKirtans}
            isLoading={isLoading}
            error={error}
            albumFilter={albumFilter}
            setAlbumFilter={setAlbumFilter}
            artistFilter={artistFilter}
            setArtistFilter={setArtistFilter}
            allAlbums={allAlbums}
            allArtists={allArtists}
            // getAlbumFiltersData={getAlbumArtistFiltersData}
            handleAlbumFilter={handleAlbumFilter}
            handleArtistFilter={handleArtistFilter}
            // displayAlbumFilterKirtans={displayAlbumFilterKirtans}
            // kirtanTitle={kirtanTitle}
            // kirtanTitleRef={kirtanTitleRef}
          />
        </Row>
        <PaginationComponent
          entriesPerPage={entriesPerPage}
          totalKirtans={searchTerm ? searchedKirtans.length : kirtans.length}
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Container>
    </Container>
  );
}

export default App;
