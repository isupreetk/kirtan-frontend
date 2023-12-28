import "./KirtanList.scss";
// import InfiniteScroll from "react-infinite-scroll-component";
import { Row } from "react-bootstrap";
import { FileEarmarkPlay, Download } from "react-bootstrap-icons";

function KirtanList({
  searchTerm,
  //   kirtans,
  displayKirtans,
  //   sortedKirtans,
  isLoading,
  error,
  albumFilter,
  setAlbumFilter,
  artistFilter,
  setArtistFilter,
  allAlbums,
  allArtists,
  //   getAlbumArtistFiltersData,
  handleAlbumFilter,
  handleArtistFilter,
  //   displayAlbumFilterKirtans,
  //   kirtanTitleRef,
  setSelectedKirtan,
  setPlay,
}) {
  if (isLoading) {
    return <h2>...Loading</h2>;
  }

  const handleKirtanSelection = (kirtan) => {
    // console.log("kirtan", kirtan);
    setPlay(true);
    setSelectedKirtan(kirtan);
  };

  return (
    <>
      {displayKirtans.map((kirtan) => {
        // console.log(kirtan.Title);
        return (
          <Row>
            <div className="list-group">
              <a
                href="#"
                onClick={() => handleKirtanSelection(kirtan)}
                className="list-group-item list-group-item-action flex-column align-items-start"
              >
                <div className="d-flex w-100 justify-content-between">
                  <p className="mb-1">{kirtan.Title}</p>
                  <div className="d-flex justify-content-end">
                    <small className="text-muted mr-1">
                      <p onClick={() => handleKirtanSelection(kirtan)}>
                        <FileEarmarkPlay className="button__play" />
                      </p>
                    </small>
                    <small className="text-muted ml-1">
                      <p onClick={() => handleKirtanSelection(kirtan)}>
                        <Download className="button__download" />
                      </p>
                    </small>
                  </div>
                </div>
                <p className="d-flex mb-1 ml-1">
                  {kirtan.Sevadar}, {kirtan.Album}
                </p>
                {/* <small className="text-muted">Donec id elit non mi porta.</small> */}
              </a>
            </div>
          </Row>
        );
      })}
    </>
  );
}

export default KirtanList;
