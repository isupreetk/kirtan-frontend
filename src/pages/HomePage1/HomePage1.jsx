// Pure function
import { useState, useEffect, useRef } from "react";
import { Container, Row } from "react-bootstrap";
import kirtansData from "../../assets/data/kirtanDataSet.json";
import toPascalCase from "../../utils.js";
import SearchBar from "../../components/SearchBar/SearchBar";
import Filters from "../../components/Filters/Filters";
import KirtanList from "../../components/KirtanList/KirtanList";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import PaginationComponent from "../../components/Pagination/Pagination";
import GoogleForm from "../../components/GoogleForm/GoogleForm";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./HomePage1.scss";

function HomePage1() {
  let inputRef = useRef();
  let navigate = useNavigate();

  let [searchParams] = useSearchParams();
  let urlAlbum = searchParams.get("urlAlbum");
  let urlArtist = searchParams.get("urlArtist");
  let urlSearchString = searchParams.get("urlSearchString");

  let [searchTerm, setSearchTerm] = useState(
    urlSearchString ? urlSearchString : ""
  );
  let [searchArray, setSearchArray] = useState([]);
  let [kirtans, setKirtans] = useState(kirtansData);
  let [displayKirtans, setDisplayKirtans] = useState([]);
  let [searchedKirtans] = useState([]);
  let [sortedSearchedKirtans, setSortedSearchedKirtans] = useState([]);
  let [totalKirtans, setTotalKirtans] = useState(kirtansData.length);
  let [possibleCombinations] = useState([]);
  let [allAlbums, setAllAlbums] = useState([]);
  let [allArtists, setAllArtists] = useState([]);
  let [albumFilter, setAlbumFilter] = useState(urlAlbum ? urlAlbum : []);
  let [albumFilteredKirtans] = useState([]);
  let [artistFilter, setArtistFilter] = useState(urlArtist ? urlArtist : []);
  let [artistFilteredKirtans] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [currentKirtans, setCurrentKirtans] = useState([]);
  let [selectedKirtan, setSelectedKirtan] = useState([]);
  let [play, setPlay] = useState(false);
  let [isLoading] = useState(false);
  let [error] = useState(null);
  let entriesPerPage = 100;

  const resetSearch = () => {
    inputRef.current.value = "";
    setSearchTerm("");
    setSearchArray([]);
    setCurrentPage(1);
    setKirtans(kirtansData);
    setDisplayKirtans(kirtansData);
    // setSearchedKirtans(kirtansData); // BUG
    setSortedSearchedKirtans(kirtansData);
    setTotalKirtans(kirtansData.length);
  };

  const handleSearch = () => {
    // console.log(inputRef);
    setSearchTerm(inputRef.current.value);
    setSearchArray(inputRef.current.value.split(" "));
    setCurrentPage(1); //this is to bring back to page 1 for every new search
    navigate(
      `/?urlSearchString=${searchTerm}&urlAlbum=${albumFilter}&urlArtist=${artistFilter}`
    ); // to populate applied filters in url (make shareable url)
    // searchHistory.push(inputRef.current.value);
  };

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
  };

  const getPossibleCombinations = (searchTerm) => {
    searchArray = searchTerm.split(" ");
    searchArray = searchArray.filter((s) => s !== "");
    possibleCombinations = searchArray
      .reduce(
        (subsets, value) =>
          subsets.concat(subsets.map((set) => [value, ...set])),
        [[]]
      )
      .sort((a, b) => {
        return b.length - a.length;
      });
    return possibleCombinations;
  };

  const calculateKirtanScore = (kirtan, possibleCombinations) => {
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

  const getSearchedKirtans = (kirtans, possibleCombinations) => {
    searchedKirtans = kirtans.filter((kirtan) => {
      return calculateKirtanScore(kirtan, possibleCombinations);
    });
    return searchedKirtans;
  };

  const getSortedSearchedKirtans = (searchedKirtans) => {
    // console.log("searchedKirtans", searchedKirtans);
    let sortedData = searchedKirtans.sort((a, b) => {
      return b.Score - a.Score;
    });
    if (sortedData.length > 0) {
      sortedSearchedKirtans = sortedData;
      displayKirtans = sortedData;
      totalKirtans = sortedData.length;
      return [sortedSearchedKirtans, displayKirtans, totalKirtans];
    } else {
      sortedSearchedKirtans = kirtans;
      displayKirtans = kirtans;
      totalKirtans = kirtans.length;
      return [sortedSearchedKirtans, displayKirtans, totalKirtans];
    }
  };

  const handleAlbumFilter = (event) => {
    /* to accomodate multi select filter */
    albumFilter = [];
    // console.log(event);
    if (event.length > 0) {
      event.forEach((e) => {
        albumFilter.push(e.value);
        setAlbumFilter(albumFilter);
        navigate(
          `/?urlSearchString=${searchTerm}&urlAlbum=${albumFilter}&urlArtist=${artistFilter}`
        ); // to populate applied filters in url (make shareable url)
      });
    } else {
      setAlbumFilter(albumFilter);
      navigate(
        `/?urlSearchString=${searchTerm}&urlAlbum=${albumFilter}&urlArtist=${artistFilter}`
      ); // to populate applied filters in url (make shareable url)
    }
  };

  const getAlbumFilteredKirtans = (sortedSearchedKirtans, albumFilter) => {
    // console.log("sortedSearchedKirtans", sortedSearchedKirtans);
    if (albumFilter.length === 0) {
      albumFilteredKirtans = sortedSearchedKirtans;
      displayKirtans = sortedSearchedKirtans;
      totalKirtans = sortedSearchedKirtans.length;
    } else {
      albumFilteredKirtans = sortedSearchedKirtans.filter((item) => {
        return albumFilter.includes(item.Album);
      });
      displayKirtans = albumFilteredKirtans;
      totalKirtans = albumFilteredKirtans.length;
    }
    return [albumFilteredKirtans, displayKirtans, totalKirtans];
  };

  const handleArtistFilter = (event) => {
    /* to accomodate multi select filter */
    artistFilter = [];
    if (event.length > 0) {
      event.forEach((e) => {
        artistFilter.push(e.value);
        setArtistFilter(artistFilter);
        navigate(
          `/?urlSearchString=${searchTerm}&urlAlbum=${albumFilter}&urlArtist=${artistFilter}`
        ); // to populate applied filters in url (make shareable url)
      });
    } else {
      setArtistFilter(artistFilter);
      navigate(
        `/?urlSearchString=${searchTerm}&urlAlbum=${albumFilter}&urlArtist=${artistFilter}`
      ); // to populate applied filters in url (make shareable url)
    }
  };

  const getArtistFilteredKirtans = (albumFilteredKirtans, artistFilter) => {
    // console.log("albumFilteredKirtans", albumFilteredKirtans);
    if (artistFilter.length === 0) {
      artistFilteredKirtans = albumFilteredKirtans;
      totalKirtans = albumFilteredKirtans.length;
    } else {
      artistFilteredKirtans = albumFilteredKirtans.filter((item) => {
        return artistFilter.includes(item.Sevadar);
      });
      displayKirtans = artistFilteredKirtans;
      totalKirtans = artistFilteredKirtans.length;
    }
    return [artistFilteredKirtans, displayKirtans, totalKirtans];
  };

  function getResultKirtans(kirtans, searchTerm, albumFilter, artistFilter) {
    getPossibleCombinations(searchTerm);
    getSearchedKirtans(kirtans, possibleCombinations);
    getSortedSearchedKirtans(searchedKirtans);
    getAlbumFilteredKirtans(sortedSearchedKirtans, albumFilter);
    getArtistFilteredKirtans(albumFilteredKirtans, artistFilter);
    // console.log("artistFilteredKirtans", displayKirtans);
    return displayKirtans;
  }

  useEffect(() => {
    // console.log("useEffect triggered");
    getResultKirtans(kirtans, searchTerm, albumFilter, artistFilter);
    setDisplayKirtans(displayKirtans);
    // eslint-disable-next-line
  }, [searchTerm, albumFilter, artistFilter, kirtans]);

  useEffect(
    () => {
      //   console.log("displayKirtans useEffect trigerred", displayKirtans);
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

  useEffect(() => {
    // console.log("kirtans loaded", kirtans);
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

  return (
    <>
      <Container fluid>
        <Container>
          <Row className="p-4">
            <SearchBar
              inputRef={inputRef}
              handleSearch={handleSearch}
              resetSearch={resetSearch}
              urlSearchString={urlSearchString}
              // searchHistory={searchHistory}
            />
          </Row>
          <Filters
            allAlbums={allAlbums}
            handleAlbumFilter={handleAlbumFilter}
            allArtists={allArtists}
            handleArtistFilter={handleArtistFilter}
            urlAlbum={urlAlbum}
            urlArtist={urlArtist}
          />
          <Row>
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

export default HomePage1;
