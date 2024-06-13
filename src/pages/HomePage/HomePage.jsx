import { useState, useEffect, useRef } from "react";
import { Container, Row } from "react-bootstrap";
import toPascalCase from "../../utils.js";
import SearchBar from "../../components/SearchBar/SearchBar";
import Filters from "../../components/Filters/Filters";
import KirtanList from "../../components/KirtanList/KirtanList";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import PaginationComponent from "../../components/Pagination/Pagination";
import GoogleForm from "../../components/GoogleForm/GoogleForm";
import { useSearchParams, useNavigate } from "react-router-dom";
import { usePapaParse } from "react-papaparse";
import axios from "axios";
import "./HomePage.scss";

function HomePage() {
  let inputRef = useRef();
  let navigate = useNavigate();

  let [searchParams] = useSearchParams();
  let urlAlbum = searchParams.get("urlAlbum");
  let urlArtist = searchParams.get("urlArtist");
  let urlSearchString = searchParams.get("urlSearchString");

  let [searchTerm, setSearchTerm] = useState(
    urlSearchString ? urlSearchString : ""
  );

  let [kirtans, setKirtans] = useState([]);
  let [kirtansCache, setKirtansCache] = useState(
    localStorage.getItem("kirtansCache")
  );
  let [displayKirtans, setDisplayKirtans] = useState([]);
  let [totalKirtans, setTotalKirtans] = useState(0);
  let [allAlbums, setAllAlbums] = useState([]);
  let [allArtists, setAllArtists] = useState([]);
  let [albumFilter, setAlbumFilter] = useState(urlAlbum ? urlAlbum : []);
  let [artistFilter, setArtistFilter] = useState(urlArtist ? urlArtist : []);
  let [currentPage, setCurrentPage] = useState(1);
  let [currentKirtans, setCurrentKirtans] = useState([]);
  let [selectedKirtan, setSelectedKirtan] = useState([]);
  let [play, setPlay] = useState(false);
  let [isLoading] = useState(false);
  let [error] = useState(null);
  let entriesPerPage = 100;
  let [timeoutHistory, setTimeoutHistory] = useState([]);

  const { readRemoteFile } = usePapaParse();

  let cachingVersion;
  let fileURL;
  let newDBInfo = {};

  const loadKirtans = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/settings?key=Version&key=FileURL`)
      .then((data) => {
        data.data.forEach((d) => {
          newDBInfo[d.key] = d.value;
        });
        cachingVersion = newDBInfo.Version;
        fileURL = newDBInfo.FileURL;
        if (
          localStorage.getItem("cachingVersion") === null ||
          localStorage.getItem("cachingVersion") !== cachingVersion
        ) {
          readRemoteFile(
            `${fileURL}`,
            {
              header: true,
              complete: (data) => {
                setKirtansCache(JSON.stringify(data.data));
                localStorage.setItem("kirtansCache", JSON.stringify(data.data));
                localStorage.setItem(
                  "cachingVersion",
                  parseInt(cachingVersion)
                );
              },
              worker: true,
            }
          );
        }
        return newDBInfo;
      })
      .catch((error) => {
        return error;
      });
  };

  useEffect(() => {
    loadKirtans();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem("cachingVersion") === null &&
      localStorage.getItem("cachingVersion") !== cachingVersion &&
      localStorage.getItem("kirtansCache") === null
    ) {
      loadKirtans();
    } else {
      setKirtans(JSON.parse(localStorage.getItem("kirtansCache")));
    }
    // eslint-disable-next-line
  }, [kirtansCache]);

  const resetSearch = () => {
    inputRef.current.value = "";
    setSearchTerm(inputRef.current.value);
    setCurrentPage(1);
    setTotalKirtans(kirtans.length);
    navigate(
      `/?urlSearchString=${inputRef.current.value}&urlAlbum=${albumFilter}&urlArtist=${artistFilter}`
    );
  };

  const handleSearch = () => {
    setSearchTerm(inputRef.current.value);
    setCurrentPage(1); //this is to bring back to page 1 for every new search
    navigate(
      `/?urlSearchString=${inputRef.current.value}&urlAlbum=${albumFilter}&urlArtist=${artistFilter}`
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
    let searchArray = searchTerm.split(" ");
    searchArray = searchArray.filter((s) => s !== "");
    return searchArray
      .reduce(
        (subsets, value) =>
          subsets.concat(subsets.map((set) => [value, ...set])),
        [[]]
      )
      .sort((a, b) => {
        return b.length - a.length;
      });
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
    return kirtans?.filter((kirtan) => {
      return calculateKirtanScore(kirtan, possibleCombinations);
    });
  };

  const getSortedSearchedKirtans = (searchedKirtans) => {
    let sortedData = searchedKirtans?.sort((a, b) => {
      return b.Score - a.Score;
    });
    if (sortedData?.length > 0) {
      return sortedData;
    } else {
      return kirtans;
    }
  };

  const handleAlbumFilter = (event) => {
    /* to accomodate multi select filter */
    albumFilter = [];
    if (event.length > 0) {
      event.forEach((e) => {
        albumFilter.push(e.value);
        setAlbumFilter(albumFilter);
        navigate(
          `/?urlSearchString=${inputRef.current.value}&urlAlbum=${albumFilter}&urlArtist=${artistFilter}`
        ); // to populate applied filters in url (make shareable url)
      });
    } else {
      setAlbumFilter(albumFilter);
      navigate(
        `/?urlSearchString=${inputRef.current.value}&urlAlbum=${albumFilter}&urlArtist=${artistFilter}`
      ); // to populate applied filters in url (make shareable url)
    }
  };

  const getAlbumFilteredKirtans = (sortedSearchedKirtans, albumFilter) => {
    if (albumFilter.length === 0) {
      return sortedSearchedKirtans;
    } else {
      return sortedSearchedKirtans.filter((item) => {
        return albumFilter.includes(item.Album);
      });
    }
  };

  const handleArtistFilter = (event) => {
    /* to accomodate multi select filter */
    artistFilter = [];
    if (event.length > 0) {
      event.forEach((e) => {
        artistFilter.push(e.value);
        setArtistFilter(artistFilter);
        navigate(
          `/?urlSearchString=${inputRef.current.value}&urlAlbum=${albumFilter}&urlArtist=${artistFilter}`
        ); // to populate applied filters in url (make shareable url)
      });
    } else {
      setArtistFilter(artistFilter);
      navigate(
        `/?urlSearchString=${inputRef.current.value}&urlAlbum=${albumFilter}&urlArtist=${artistFilter}`
      ); // to populate applied filters in url (make shareable url)
    }
  };

  const getArtistFilteredKirtans = (albumFilteredKirtans, artistFilter) => {
    if (artistFilter.length === 0) {
      return albumFilteredKirtans;
    } else {
      return albumFilteredKirtans.filter((item) => {
        return artistFilter.includes(item.Sevadar);
      });
    }
  };

  function getResultKirtans(kirtans, searchTerm, albumFilter, artistFilter) {
    let possibleCombinations = getPossibleCombinations(searchTerm);

    let searchedKirtans = getSearchedKirtans(kirtans, possibleCombinations);

    let sortedSearchedKirtans = getSortedSearchedKirtans(searchedKirtans);

    let albumFilteredKirtans = getAlbumFilteredKirtans(
      sortedSearchedKirtans,
      albumFilter
    );
    let artistFilteredKirtans = getArtistFilteredKirtans(
      albumFilteredKirtans,
      artistFilter
    );
    return artistFilteredKirtans;
  }

  useEffect(() => {
    if (timeoutHistory.length > 0) {
      timeoutHistory.forEach((history) => {
        let index = timeoutHistory.indexOf(history);
        if (index > -1) {
          timeoutHistory.splice(index, 1);
        }
        clearTimeout(history);
      });
    }

    let searchTimeoutId = setTimeout(() => {
      setDisplayKirtans(
        getResultKirtans(kirtans, searchTerm, albumFilter, artistFilter)
      );
    }, 250);

    timeoutHistory.push(searchTimeoutId);
    setTimeoutHistory(timeoutHistory);

    // eslint-disable-next-line
  }, [kirtans, searchTerm, albumFilter, artistFilter]);

  useEffect(
    () => {
      // Get Current Kirtans
      let indexOfLastKirtan = currentPage * entriesPerPage;
      let indexOfFirstKirtan = indexOfLastKirtan - entriesPerPage;
      setCurrentKirtans(
        displayKirtans?.slice(indexOfFirstKirtan, indexOfLastKirtan)
      );
      setTotalKirtans(displayKirtans?.length);
    },
    // eslint-disable-next-line
    [displayKirtans, currentPage]
  );

  useEffect(() => {
    kirtans?.forEach((kirtan) => {
      if (!allAlbums.includes(kirtan.Album)) {
        allAlbums.push(kirtan.Album);
      }
      if (!allArtists.includes(kirtan.Sevadar)) {
        allArtists.push(kirtan.Sevadar);
      }
    });
    setAllAlbums(allAlbums);
    setAllArtists(allArtists);
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
              displayKirtans={currentKirtans}
              isLoading={isLoading}
              error={error}
              albumFilter={albumFilter}
              setAlbumFilter={setAlbumFilter}
              artistFilter={artistFilter}
              setArtistFilter={setArtistFilter}
              allAlbums={allAlbums}
              allArtists={allArtists}
              handleAlbumFilter={handleAlbumFilter}
              handleArtistFilter={handleArtistFilter}
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
        totalKirtans={totalKirtans}
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
