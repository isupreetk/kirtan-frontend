import "./HomePage.scss";
import { useRef, useEffect, useState } from "react";
import kirtansData from "../../assets/data/kirtanDataSet.json";

// import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import Filters from "../../components/Filters/Filters";
import GoogleForm from "../../components/GoogleForm/GoogleForm";
import KirtanList from "../../components/KirtanList/KirtanList";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
// import searchHistoryData from "./assets/data/searchHistory.json";
// import InfiniteScroll from "react-infinite-scroll-component";
import PaginationComponent from "../../components/Pagination/Pagination";
import { Container, Row } from "react-bootstrap";
import ReactGA from "react-ga";
import { useSearchParams } from "react-router-dom";
// , useNavigate
import toPascalCase from "../../utils.js";

function HomePage() {
  const TRACKING_ID = "G-4R29HH74RE";
  ReactGA.initialize(TRACKING_ID);
  ReactGA.pageview(window.location.pathname + window.location.search);

  let [searchParams] = useSearchParams();
  let urlAlbum = searchParams.get("urlAlbum");
  let urlArtist = searchParams.get("urlArtist");
  let urlSearchString = searchParams.get("urlSearchString");
  // let urlAlbum = searchParams.get("urlAlbum")?.split(",");
  // let urlArtist = searchParams.get("urlArtist")?.split(",");

  let inputRef = useRef();
  // let navigate = useNavigate();
  // let kirtanTitleRef = useRef([]);
  // let [kirtanTitleRef, setKirtanTitleRef] = useState([]);
  let [searchTerm, setSearchTerm] = useState("");
  let [searchArray, setSearchArray] = useState([]);
  let [possibleCombinations, setPossibleCombinations] = useState([]);

  let [kirtans, setKirtans] = useState([]);
  let [sortedKirtans] = useState([]);
  let [searchedKirtans, setSearchedKirtans] = useState([]);
  let [sortedSearchedKirtans, setSortedSearchedKirtans] = useState([]);

  let [displayKirtans, setDisplayKirtans] = useState([]);
  let [allAlbums, setAllAlbums] = useState([]);
  let [allArtists, setAllArtists] = useState([]);
  let [albumFilter, setAlbumFilter] = useState([]);
  let [artistFilter, setArtistFilter] = useState([]);
  let [albumFilteredKirtans, setAlbumFilteredKirtans] = useState([]);
  let [artistFilteredKirtans, setArtistFilteredKirtans] = useState([]);
  let [currentKirtans, setCurrentKirtans] = useState([]);
  let [selectedKirtan, setSelectedKirtan] = useState([]); // for play and download functionality
  let [play, setPlay] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(null);
  let [currentPage, setCurrentPage] = useState(1);
  let [entriesPerPage] = useState(100);
  let [totalKirtans, setTotalKirtans] = useState(0);

  // let [searchHistory, setSearchHistory] = useState(searchHistoryData);
  // let [searchHistory, setSearchHistory] = useState([]);

  /* changed JSON file with sorted data*/
  const sortByLatestKirtans = () => {
    sortedKirtans = kirtansData.sort((a, b) => {
      return new Date(b.createdon) - new Date(a.createdon);
    });
    return sortedKirtans;
  };

  const getAllSubsets = (searchArray) => {
    searchArray = searchArray.filter((s) => s !== "");
    let sortedCombinations = searchArray
      .reduce(
        (subsets, value) =>
          subsets.concat(subsets.map((set) => [value, ...set])),
        [[]]
      )
      .sort((a, b) => {
        return b.length - a.length;
      });
    return sortedCombinations;
  };

  const handleAlbumFilter = (event) => {
    /* to accomodate multi select filter */
    albumFilter = [];
    // console.log(event);
    event.length > 0
      ? event.forEach((e) => {
          albumFilter.push(e.value);
          setAlbumFilter(albumFilter);
          // navigate(`/?urlAlbum=${albumFilter}&urlArtist=${artistFilter}`); // to populate applied filters in url (make shareable url)
        })
      : setAlbumFilter(albumFilter);
    // navigate(`/?urlAlbum=${albumFilter}&urlArtist=${artistFilter}`); // to populate applied filters in url (make shareable url)
  };

  const handleArtistFilter = (event) => {
    /* to accomodate multi select filter */
    artistFilter = [];
    event.length > 0
      ? event.forEach((e) => {
          artistFilter.push(e.value);
          setArtistFilter(artistFilter);
          // navigate(`/?urlAlbum=${albumFilter}&urlArtist=${artistFilter}`); // to populate applied filters in url (make shareable url)
        })
      : setArtistFilter(artistFilter);
    // navigate(`/?urlAlbum=${albumFilter}&urlArtist=${artistFilter}`); // to populate applied filters in url (make shareable url)
  };

  const getAlbumFiltersData = (data) => {
    if (albumFilter.length === 0) {
      setAlbumFilteredKirtans(sortedSearchedKirtans);
      setDisplayKirtans(sortedSearchedKirtans);
      setTotalKirtans(sortedSearchedKirtans.length);
    } else {
      albumFilteredKirtans = data.filter((item) => {
        return albumFilter.includes(item.Album);
      });
      setAlbumFilteredKirtans(albumFilteredKirtans);
      setDisplayKirtans(albumFilteredKirtans);
      setTotalKirtans(albumFilteredKirtans.length);
    }
  };

  const getArtistFiltersData = (data) => {
    if (artistFilter.length === 0) {
      setArtistFilteredKirtans(sortedSearchedKirtans);
      setTotalKirtans(sortedSearchedKirtans.length);
    } else {
      artistFilteredKirtans = data.filter((item) => {
        return artistFilter.includes(item.Sevadar);
      });
      setArtistFilteredKirtans(artistFilteredKirtans);
      setDisplayKirtans(artistFilteredKirtans);
      setTotalKirtans(artistFilteredKirtans.length);
    }
  };

  const getAlbumAndArtistFiltersData = (data) => {
    let albumAndArtistFilteredKirtans = data.filter((item) => {
      return (
        albumFilter.includes(item.Album) && artistFilter.includes(item.Sevadar)
      );
    });
    setDisplayKirtans(albumAndArtistFilteredKirtans);
    setTotalKirtans(albumAndArtistFilteredKirtans.length);
  };

  useEffect(
    () => {
      if (albumFilter.length > 0 && artistFilter.length > 0) {
        getAlbumAndArtistFiltersData(sortedSearchedKirtans);
      } else if (artistFilter.length > 0 && !(albumFilter.length > 0)) {
        getArtistFiltersData(sortedSearchedKirtans);
      } else if (albumFilter.length > 0 && !(artistFilter.length > 0)) {
        getAlbumFiltersData(sortedSearchedKirtans);
      } else if (albumFilter.length === 0 && artistFilter.length === 0) {
        setDisplayKirtans(sortedSearchedKirtans);
        setTotalKirtans(sortedSearchedKirtans.length);
      }
    },
    // eslint-disable-next-line
    [albumFilter, artistFilter]
  );

  const getSortedSearchedKirtans = (data) => {
    let sortedData = data.sort((a, b) => {
      return b.Score - a.Score;
    });
    if (sortedData.length > 0) {
      // setSearchedKirtans(sortedData); // BUG
      setSortedSearchedKirtans(sortedData);
      setDisplayKirtans(sortedData);
      setTotalKirtans(sortedData.length);
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
            kirtan.Title.toString()
              .toLowerCase()
              .includes(element.toLowerCase()) ||
            kirtan.Sevadar.toLowerCase().includes(element.toLowerCase()) ||
            kirtan.Album.toLowerCase().includes(element.toLowerCase()) ||
            kirtan.audio_year?.toString().includes(element) ||
            kirtan.Titlefws.toString()
              .toLowerCase()
              .includes(element.toLowerCase())
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
            .toString()
            ?.toLowerCase()
            .replace(word?.toLowerCase(), `<strong>${word}</strong>`);
          kirtan.hSevadar = kirtan.hSevadar
            ?.toLowerCase()
            .replace(word?.toLowerCase(), `<strong>${word}</strong>`);
          kirtan.hAlbum = kirtan.hAlbum
            ?.toLowerCase()
            .replace(word?.toLowerCase(), `<strong>${word}</strong>`);
        });
        kirtan.hTitle = toPascalCase(kirtan.hTitle);
        kirtan.hSevadar = toPascalCase(kirtan.hSevadar);
        kirtan.hAlbum = toPascalCase(kirtan.hAlbum);
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
    setPossibleCombinations(getAllSubsets(searchArray));
  }, [searchArray]);

  useEffect(
    () => {
      setIsLoading(true);
      setError(false);
      setSearchedKirtans(
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
    getSortedSearchedKirtans(searchedKirtans);
  }, [searchedKirtans]);

  useEffect(() => {
    // eslint-disable-next-line
    // allAlbums = [];
    // eslint-disable-next-line
    // allArtists = [];
    // let filterDataSet = kirtans;
    // let filterDataSet = [];
    // if (searchTerm) {
    // filterDataSet = kirtans;
    // } else {
    // filterDataSet = displayKirtans;
    // }

    // filterDataSet.forEach((kirtan) => {
    kirtans.forEach((kirtan) => {
      if (allAlbums.includes(kirtan.Album)) {
      } else if (allArtists.includes(kirtan.Sevadar)) {
      } else {
        allAlbums.push(kirtan.Album);
        allArtists.push(kirtan.Sevadar);
      }
    });
    setAllAlbums(allAlbums);
    // console.log("allAlbums", allAlbums);
    setAllArtists(allArtists);
    // console.log("allArtists", allArtists);
    // }, [sortedSearchedKirtans]);
    // eslint-disable-next-line
  }, [kirtans]);

  useEffect(() => {
    if (urlSearchString) {
      handleSearch();
    }
  }, [urlSearchString]);

  useEffect(() => {
    if (urlAlbum) {
      setAlbumFilter(urlAlbum);
    }
  }, [urlAlbum]);

  useEffect(() => {
    if (urlArtist) {
      setArtistFilter(urlArtist);
    }
  }, [urlArtist]);

  useEffect(
    () => {
      sortByLatestKirtans();
      setKirtans(sortedKirtans);
      setDisplayKirtans(sortedKirtans);
      // setSearchedKirtans(sortedKirtans); // BUG
      setSortedSearchedKirtans(sortedKirtans);
      setTotalKirtans(sortedKirtans.length);
    },
    // eslint-disable-next-line
    []
  );

  const resetSearch = () => {
    inputRef.current.value = "";
    setSearchTerm("");
    setSearchArray([]);
    setCurrentPage(1);
    setKirtans(kirtansData);
    setDisplayKirtans(kirtansData);
    setSearchedKirtans(kirtansData); // BUG
    setSortedSearchedKirtans(kirtansData);
    setTotalKirtans(kirtansData.length);
  };

  const handleSearch = () => {
    // console.log(inputRef);
    setSearchTerm(inputRef.current.value);
    setSearchArray(inputRef.current.value.split(" "));
    setCurrentPage(1); //this is to bring back to page 1 for every new search

    // searchHistory.push(inputRef.current.value);
  };

  useEffect(
    () => {
      // Get Current Kirtans
      let indexOfLastKirtan = currentPage * entriesPerPage;
      let indexOfFirstKirtan = indexOfLastKirtan - entriesPerPage;
      setCurrentKirtans(
        // searchTerm
        //   ? sortedKirtans.slice(indexOfFirstKirtan, indexOfLastKirtan)
        //   : kirtans.slice(indexOfFirstKirtan, indexOfLastKirtan);
        displayKirtans.slice(indexOfFirstKirtan, indexOfLastKirtan)
      );
    },
    // eslint-disable-next-line
    [displayKirtans, currentPage]
  );

  // Get Page
  const paginate = (event, pageNumber) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  };

  const togglePlay = (selectedKirtan) => {
    let playImageEl = document.getElementById(`play${selectedKirtan.aid}`);
    let pauseImageEl = document.getElementById(`pause${selectedKirtan.aid}`);
    if (playImageEl.classList.value.includes("button__hidden")) {
      playImageEl.classList.remove("button__hidden");
      pauseImageEl.classList.add("button__hidden");
    } else if (pauseImageEl.classList.value.includes("button__hidden")) {
      pauseImageEl.classList.remove("button__hidden");
      playImageEl.classList.add("button__hidden");
    }
    // if (imageEl.alt === "play button") {
    //   imageEl.src = { PauseIcon };
    //   imageEl.alt = "pause button";
    //   console.log(imageEl.src, imageEl.alt);
    // } else {
    //   imageEl.src = { PlayIcon };
    //   imageEl.alt = "play button";
    //   console.log(imageEl.src, imageEl.alt);
    // }
  };

  return (
    <>
      <Container fluid>
        <Container>
          <Row className="p-4">
            {/* <Col xs={1} md={2}></Col>
          <Col md={8} xs={10} className="p-0"> */}
            <SearchBar
              inputRef={inputRef}
              handleSearch={handleSearch}
              resetSearch={resetSearch}
              urlSearchString={urlSearchString}
              // searchHistory={searchHistory}
            />
            {/* </Col>
          <Col xs={1} md={2}></Col> */}
          </Row>
          {/* <Row> */}
          <Filters
            allAlbums={allAlbums}
            handleAlbumFilter={handleAlbumFilter}
            allArtists={allArtists}
            handleArtistFilter={handleArtistFilter}
            urlAlbum={urlAlbum}
            urlArtist={urlArtist}
          />
          {/* </Row> */}
          <Row>
            {/* className="align-items-center" */}
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
              selectedKirtan={selectedKirtan}
              setSelectedKirtan={setSelectedKirtan}
              play={play}
              setPlay={setPlay}
              togglePlay={togglePlay}
            />
          </Row>
          <AudioPlayer
            selectedKirtan={selectedKirtan}
            play={play}
            setPlay={setPlay}
          />
        </Container>
      </Container>
      <PaginationComponent
        entriesPerPage={entriesPerPage}
        totalKirtans={
          // searchTerm || albumFilter || artistFilter
          //   ? // sortedSearchedKirtans.length > 0
          //     sortedSearchedKirtans.length
          //   : kirtans.length
          totalKirtans
        }
        paginate={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Container fluid>
        <Container>
          <Row>
            <GoogleForm />
          </Row>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </Container>
      </Container>
    </>
  );
}

export default HomePage;
