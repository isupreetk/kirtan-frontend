import { useState, useEffect, useRef } from "react";
import { Container, Row } from "react-bootstrap";
import {toPascalCase} from "../../utils.js";
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

  let inputRef = useRef();
  let navigate = useNavigate();

  let [searchParams] = useSearchParams();
  let urlAlbum = searchParams.get("urlAlbum");
  let urlArtist = searchParams.get("urlArtist");
  let urlSearchString = searchParams.get("urlSearchString");
  let [totalKirtans, setTotalKirtans] = useState(0);
  let [currentPage, setCurrentPage] = useState(1);
  let [currentPageKirtans, setCurrentPageKirtans] = useState([]);
  let [selectedKirtan, setSelectedKirtan] = useState([]);
  let [play, setPlay] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let [error] = useState(null);
  let entriesPerPage = 100;
  let [timeoutHistory, setTimeoutHistory] = useState([]);

  const { readRemoteFile } = usePapaParse();
  let fileURL;
  let newDBInfo = {};

  const loadKirtans = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/settings?key=Version&key=FileURL`)
      .then((data) => {
        data.data.forEach((d) => {
          newDBInfo[d.key] = d.value;
        });
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
        return newDBInfo;
      })
      .catch((error) => {
        return error;
      });
  };

  useEffect(() => {
    loadKirtans();
    if (urlAlbum) {
      dispatch(setSelectedAlbumFilter(urlAlbum?.split(",")));
    }
    if (urlArtist) {
      dispatch(setSelectedArtistFilter(urlArtist?.split(",")));
    }
    if (urlSearchString) {
      dispatch(setSearchString(urlSearchString));
    }
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

  const handleAlbumFilter = (event) => {
    /* to accomodate multi select filter */
    let albumFilter = [];
    if (event.length > 0) {
      event.forEach((e) => {
        if (e.value !== "") {
         albumFilter.push(e.value);
        }
      });
    } 
    dispatch(setSelectedAlbumFilter(albumFilter));
    navigate(
      `/?urlSearchString=${inputRef.current.value}&urlAlbum=${albumFilter}&urlArtist=${selectedArtistFilters}`
    ); // to populate applied filters in url (make shareable url)
  };

  const handleArtistFilter = (event) => {
    /* to accomodate multi select filter */
    let artistFilter = [];
    if (event.length > 0) {
      event.forEach((e) => {
        if (e.value !== "") {
        artistFilter.push(e.value);
        }
      });
    } 
    dispatch(setSelectedArtistFilter(artistFilter));
    navigate(
      `/?urlSearchString=${inputRef.current.value}&urlAlbum=${selectedAlbumFilters}&urlArtist=${artistFilter}`
    ); // to populate applied filters in url (make shareable url)
  };

  useEffect(() => {
    let searchTimeoutId = setTimeout(() => {
      dispatch(handleInputSearch({allKirtans: allKirtans, inputSearchString: inputSearchString, selectedAlbumFilters: selectedAlbumFilters, selectedArtistFilters: selectedArtistFilters}))
    }, 250);

    return () => {
      clearTimeout(searchTimeoutId);
    }
  }, [allKirtans, inputSearchString, selectedAlbumFilters, selectedArtistFilters]);

  useEffect(
    () => {
      // Get Current Kirtans
      let indexOfLastKirtan = currentPage * entriesPerPage;
      let indexOfFirstKirtan = indexOfLastKirtan - entriesPerPage;
      setCurrentPageKirtans(
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
                displayKirtans={currentPageKirtans}
                error={error}
                albumFilter={selectedAlbumFilters}
                artistFilter={selectedArtistFilters}
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
