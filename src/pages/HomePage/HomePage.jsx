import { useState, useEffect, useRef } from "react";
import { Container, Row } from "react-bootstrap";
import toPascalCase from "../../utils.js";
import SearchBar from "../../components/SearchBar/SearchBar";
import Filters from "../../components/Filters/Filters";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import KirtanList from "../../components/KirtanList/KirtanList";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import PaginationComponent from "../../components/Pagination/Pagination";
import GoogleForm from "../../components/GoogleForm/GoogleForm";
import { useSearchParams, useNavigate } from "react-router-dom";
import { usePapaParse } from "react-papaparse";
import axios from "axios";
import "./HomePage.scss";
import { useDispatch, useSelector } from "react-redux";
import { editScore, editScoreSingle, populateHTitle, populateHSevadar, populateHAlbum } from "../../utils/kirtansSlice.js";
import { addAllAlbums, addAllArtists, addAllKirtans } from "../../utils/globalDataSlice.js";
import { setSearchString, setSelectedAlbumFilter, setSelectedArtistFilter, handleInputSearch } from "../../utils/displaySlice.js";

function HomePage() {
  const dispatch = useDispatch();
  const searchInput = useSelector((store) => {
    return store.search
});

const allKirtans = useSelector((store) => {
  return store.globalData.allKirtans;
})

const allAlbums = useSelector((store) => {
  return store.globalData.allAlbums;
})

const allArtists = useSelector((store) => {
  return store.globalData.allArtists;
})

const inputSearchString = useSelector((store) => store.display.inputSearchString);

const selectedAlbumFilters = useSelector((store) => store.display.selectedAlbumFilters);

const selectedArtistFilters = useSelector((store) => store.display.selectedArtistFilters);

const displayKirtans = useSelector((store) => store.display.displayKirtans);

// console.log("allKirtans", allKirtans);
// console.log("allAlbums", allAlbums);
// console.log("allArtists", allArtists);
// console.log("albumFilter", albumFilter);
// console.log("artistFilter", artistFilter);

  let inputRef = useRef();
  let navigate = useNavigate();

  let [searchParams] = useSearchParams();
  let urlAlbum = searchParams.get("urlAlbum");
  let urlArtist = searchParams.get("urlArtist");
  let urlSearchString = searchParams.get("urlSearchString");

  // let [searchTerm, setSearchTerm] = useState(
  //   urlSearchString ? urlSearchString : ""
  // );
  // let [kirtans, setKirtans] = useState([]);
  // let [displayKirtans, setDisplayKirtans] = useState([]);
  let [totalKirtans, setTotalKirtans] = useState(0);
  // let [allAlbums, setAllAlbums] = useState([]);
  // let [allArtists, setAllArtists] = useState([]);
  // let [albumFilter, setAlbumFilter] = useState(urlAlbum ? urlAlbum : []);
  // let [artistFilter, setArtistFilter] = useState(urlArtist ? urlArtist : []);
  let [currentPage, setCurrentPage] = useState(1);
  let [currentKirtans, setCurrentKirtans] = useState([]);
  let [selectedKirtan, setSelectedKirtan] = useState([]);
  let [play, setPlay] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let [error] = useState(null);
  let entriesPerPage = 100;
  let [timeoutHistory, setTimeoutHistory] = useState([]);

  const { readRemoteFile } = usePapaParse();

  // let cachingVersion;
  let fileURL;
  let newDBInfo = {};


  const loadKirtans = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/settings?key=Version&key=FileURL`)
      .then((data) => {
        data.data.forEach((d) => {
          newDBInfo[d.key] = d.value;
        });
        // cachingVersion = newDBInfo.Version;
        fileURL = newDBInfo.FileURL;
          readRemoteFile(`${fileURL}`, {
            header: true,
            complete: (data) => {
              let final_data = [...data.data];
              final_data.forEach((data) => {
                return data.Score = 0, data.hTitle = data.Title, data.hSevadar = data.Sevadar, data.hAlbum = data.Album;
              })
              console.log("final_data", final_data);

              dispatch(addAllKirtans(final_data));
              dispatch(addAllAlbums(final_data));
              dispatch(addAllArtists(final_data));
              setIsLoading(false);
            },
            worker: true,
          });
        // }
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

  const resetSearch = () => {
    inputRef.current.value = "";
    dispatch(setSearchString(inputRef.current.value));
    setCurrentPage(1);
    setTotalKirtans(allKirtans.length);
    navigate(
      `/?urlSearchString=${inputRef.current.value}&urlAlbum=${selectedAlbumFilters}&urlArtist=${selectedArtistFilters}`
    );
  };

  const handleSearch = () => {
    dispatch(setSearchString(inputRef.current.value));
    setCurrentPage(1); //this is to bring back to page 1 for every new search
    navigate(
      `/?urlSearchString=${inputRef.current.value}&urlAlbum=${selectedAlbumFilters}&urlArtist=${selectedArtistFilters}`
    ); // to populate applied filters in url (make shareable url)
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

  const getPossibleCombinations = (inputSearchString) => {
    let searchArray = inputSearchString?.split(" ");
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
    // let kirtanObj = {...kirtan};
    // kirtanObj.Score = 0;
    // kirtan.Score = 0
    // dispatch(editScore(index));
    // console.log("allKirtans with Score", allKirtans);
    dispatch(editScore(0));

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

      dispatch(populateHTitle({index: i, newHTitle: kirtan.Title}));
      // kirtan.hTitle = kirtan.Title;
      
      dispatch(populateHSevadar({index: i, newHSevadar: kirtan.Sevadar}));
      // kirtan.hSevadar = kirtan.Sevadar;

      dispatch(populateHAlbum({index: i, newHAlbum: kirtan.Album}));
      // kirtan.hAlbum = kirtan.Album;

      if (searchExists) {
      dispatch(editScoreSingle({index: i, scoreValue: arrayLength }));
        // kirtan.Score = arrayLength;
        array.forEach((word) => {

          dispatch(populateHTitle({index: i, newHTitle: kirtan.hTitle
            .toString()
            ?.toLowerCase()
            .replace(word?.toLowerCase(), `<strong>${word}</strong>`)}));

          // kirtan.hTitle = kirtan.hTitle
          //   .toString()
          //   ?.toLowerCase()
          //   .replace(word?.toLowerCase(), `<strong>${word}</strong>`);
          
          dispatch(populateHSevadar({index: i, newHSevadar: kirtan.hSevadar
            ?.toLowerCase()
            .replace(word?.toLowerCase(), `<strong>${word}</strong>`)}))
          
          // kirtan.hSevadar = kirtan.hSevadar
          //   ?.toLowerCase()
          //   .replace(word?.toLowerCase(), `<strong>${word}</strong>`);


          dispatch(populateHAlbum({index: i, newHAlbum: kirtan.hAlbum
            ?.toLowerCase()
            .replace(word?.toLowerCase(), `<strong>${word}</strong>`)}))

          // kirtan.hAlbum = kirtan.hAlbum
          //   ?.toLowerCase()
          //   .replace(word?.toLowerCase(), `<strong>${word}</strong>`);
        });
        
        dispatch(populateHTitle({index: i, newHTitle: toPascalCase(kirtan.hTitle)}));
        // kirtan.hTitle = toPascalCase(kirtan.hTitle);

        dispatch(populateHSevadar({index: i, newHSevadar: toPascalCase(kirtan.hSevadar)}));
        // kirtan.hSevadar = toPascalCase(kirtan.hSevadar);

        dispatch(populateHAlbum({index: i, newHAlbum: toPascalCase(kirtan.hAlbum)}));
        // kirtan.hAlbum = toPascalCase(kirtan.hAlbum);
        
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
    
    return kirtans?.filter((kirtan, index) => {
    //   dispatch(editScore({"index": index, scoreValue: 0}));
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
      return allKirtans;
    }
  };

  // const handleAlbumFilter = (event) => {
  //   /* to accomodate multi select filter */
  //   // albumFilter = [];
  //   if (event.length > 0) {
  //     event.forEach((e) => {
  //       // albumFilter.push(e.value);
  //       // setAlbumFilter(albumFilter);
  //       dispatch(setSelectedAlbumFilter(e.value));
  //       navigate(
  //         `/?urlSearchString=${inputRef.current.value}&urlAlbum=${albumFilter}&urlArtist=${artistFilter}`
  //       ); // to populate applied filters in url (make shareable url)
  //     });
  //   } else {
  //     // setAlbumFilter(albumFilter);
  //     dispatch(setSelectedAlbumFilters([]));
  //     navigate(
  //       `/?urlSearchString=${inputRef.current.value}&urlAlbum=${albumFilter}&urlArtist=${artistFilter}`
  //     ); // to populate applied filters in url (make shareable url)
  //   }
  // };

  const handleAlbumFilter = (event) => {
    /* to accomodate multi select filter */
    let albumFilter = [];
    if (event.length > 0) {
      event.forEach((e) => {
        albumFilter.push(e.value);
        // setAlbumFilter(albumFilter);
      });
    } 
    dispatch(setSelectedAlbumFilter(albumFilter));
    navigate(
      `/?urlSearchString=${inputRef.current.value}&urlAlbum=${selectedAlbumFilters}&urlArtist=${selectedArtistFilters}`
    ); // to populate applied filters in url (make shareable url)
  };

  const getAlbumFilteredKirtans = (sortedSearchedKirtans, selectedAlbumFilters) => {
    if (selectedAlbumFilters.length === 0) {
      return sortedSearchedKirtans;
    } else {
      return sortedSearchedKirtans.filter((item) => {
        return selectedAlbumFilters.includes(item.Album);
      });
    }
  };

  // const handleArtistFilter = (event) => {
  //   /* to accomodate multi select filter */
  //   // artistFilter = [];
  //   if (event.length > 0) {
  //     event.forEach((e) => {
  //       // artistFilter.push(e.value);
  //       // setArtistFilter(artistFilter);
  //       dispatch(setSelectedArtistFilters(e.value));
  //       navigate(
  //         `/?urlSearchString=${inputRef.current.value}&urlAlbum=${albumFilter}&urlArtist=${artistFilter}`
  //       ); // to populate applied filters in url (make shareable url)
  //     });
  //   } else {
  //     // setArtistFilter(artistFilter);
  //     dispatch(setSelectedArtistFilters([]));
  //     navigate(
  //       `/?urlSearchString=${inputRef.current.value}&urlAlbum=${albumFilter}&urlArtist=${artistFilter}`
  //     ); // to populate applied filters in url (make shareable url)
  //   }
  // };

  const handleArtistFilter = (event) => {
    /* to accomodate multi select filter */
    let artistFilter = [];
    if (event.length > 0) {
      event.forEach((e) => {
        artistFilter.push(e.value);
      });
    } 
    dispatch(setSelectedArtistFilter(artistFilter));
    navigate(
      `/?urlSearchString=${inputRef.current.value}&urlAlbum=${selectedAlbumFilters}&urlArtist=${selectedArtistFilters}`
    ); // to populate applied filters in url (make shareable url)
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

  function getResultKirtans(kirtans, inputSearchString, selectedAlbumFilters, selectedArtistFilters) {
    let possibleCombinations = getPossibleCombinations(inputSearchString);

    let searchedKirtans = getSearchedKirtans(allKirtans, possibleCombinations);

    let sortedSearchedKirtans = getSortedSearchedKirtans(searchedKirtans);

    let albumFilteredKirtans = getAlbumFilteredKirtans(
      sortedSearchedKirtans,
      selectedAlbumFilters
    );
    let artistFilteredKirtans = getArtistFilteredKirtans(
      albumFilteredKirtans,
      selectedArtistFilters
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
      // setDisplayKirtans(
      //   getResultKirtans(allKirtans, inputSearchString, albumFilter, artistFilter)
      // );
      dispatch(handleInputSearch({allKirtans: allKirtans, inputSearchString: inputSearchString, selectedAlbumFilters: selectedAlbumFilters, selectedArtistFilters: selectedArtistFilters}))
    }, 250);

    timeoutHistory.push(searchTimeoutId);
    setTimeoutHistory(timeoutHistory);
    // eslint-disable-next-line
  }, [allKirtans, inputSearchString, selectedAlbumFilters, selectedArtistFilters]);
  // [allKirtans, inputSearchString, albumFilter, artistFilter]);

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
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <KirtanList
                searchTerm={searchInput}
                displayKirtans={currentKirtans}
                error={error}
                albumFilter={selectedAlbumFilters}
                // setAlbumFilter={setAlbumFilter}
                artistFilter={selectedArtistFilters}
                // setArtistFilter={setArtistFilter}
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
            )}
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
