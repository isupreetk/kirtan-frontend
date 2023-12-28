import "./KirtanList.scss";
// import InfiniteScroll from "react-infinite-scroll-component";
import { Row } from "react-bootstrap";
import { Download } from "react-bootstrap-icons";
// FileEarmarkPlay

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
    setPlay(true);
    setSelectedKirtan(kirtan);
  };

  return (
    <section className="kirtan-list__container">
      {displayKirtans.map((kirtan) => {
        return (
          <Row className="">
            <div className="kirtan-list-item">
              <div className="kirtan-list-item__container1">
                <div className="kirtan-list-item__avatar">
                  {kirtan.Sevadar.charAt(0).toUpperCase()}
                </div>
              </div>
              <div
                className="kirtan-list-item__container2"
                onClick={() => handleKirtanSelection(kirtan)}
              >
                <p className="kirtan-list-item__title">{kirtan.Title}</p>
                <p className="kirtan-list-item__details">
                  {kirtan.Sevadar}, {kirtan.Album}
                </p>
              </div>
              <div className="kirtan-list-item__container3">
                <p onClick={() => handleKirtanSelection(kirtan)}>
                  <Download className="button__download" />
                </p>
              </div>
            </div>
          </Row>
        );
      })}
    </section>
  );
}

export default KirtanList;
