import "./KirtanList.scss";
import { Row } from "react-bootstrap";
import PlayIcon from "../../assets/images/play-icon.png";
import PauseIcon from "../../assets/images/pause-icon.png";
import DownloadIcon from "../../assets/images/download-icon.png";
import { populateHAlbum, populateHSevadar, populateHTitle } from "../../utils/kirtansSlice";
import { useDispatch } from "react-redux";

function KirtanList({
  searchTerm,
  displayKirtans,
  error,
  albumFilter,
  // setAlbumFilter,
  artistFilter,
  // setArtistFilter,
  allAlbums,
  allArtists,
  handleAlbumFilter,
  handleArtistFilter,
  selectedKirtan,
  setSelectedKirtan,
  play,
  setPlay,
  togglePlay,
}) {

  const dispatch = useDispatch();

  const handleKirtanClick = (kirtan) => {
    if (selectedKirtan === kirtan) {
      let player = document.getElementById("audio");
      play === true ? player.pause() : player.play();
    } else {
      setSelectedKirtan(kirtan);
    }
  };

  function downloadFile(url, filename) {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  }

  return (
    <section className="kirtan-list__container">
      {displayKirtans?.map((kirtan, index) => {
        // if (!kirtan.hTitle) kirtan.hTitle = kirtan.Title;

        if (!kirtan.hTitle) {
          dispatch( populateHTitle({ index: index, newHTitle: kirtan.Title }) );
        }

        // if (!kirtan.hSevadar) kirtan.hSevadar = kirtan.Sevadar;

        if (!kirtan.hSevadar) {
          dispatch( populateHSevadar({ index: index, newHSevadar: kirtan.Sevadar }) );
        }

        // if (!kirtan.hAlbum) kirtan.hAlbum = kirtan.Album;

        if (!kirtan.hAlbum) {
          dispatch( populateHAlbum({ index: index, newHAlbum: kirtan.Album }) );
        }


        return (
          <Row key={index}>
            <div className="kirtan-list-item">
              <div className="kirtan-list-item__wrapper">
                <div className="kirtan-list-item__container1">
                  <div className="kirtan-list-item__avatar">
                    {kirtan.Sevadar.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div
                  className="kirtan-list-item__container2"
                  onClick={() => handleKirtanClick(kirtan)}
                >
                  <p
                    className="kirtan-list-item__title"
                    dangerouslySetInnerHTML={{
                      __html: kirtan.hTitle,
                    }}
                  />
                  <p className="kirtan-list-item__details">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: kirtan.hSevadar,
                      }}
                    />
                    <span>, </span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: kirtan.hAlbum,
                      }}
                    />
                  </p>
                </div>
              </div>
              <div className="kirtan-list-item__container3">
                {play !== true || selectedKirtan !== kirtan ? (
                  <p onClick={() => handleKirtanClick(kirtan)}>
                    <img
                      src={PlayIcon}
                      alt="play button"
                      className="button button__play"
                    />
                  </p>
                ) : (
                  <p onClick={() => handleKirtanClick(kirtan)}>
                    <img
                      src={PauseIcon}
                      alt="pause button"
                      className="button button__pause"
                    />
                  </p>
                )}
                <a
                  href={kirtan.cdnpath}
                  download={kirtan.filename}
                  type="application/octet-stream"
                  disposition="attachment"
                  target="_blank"
                  rel="noreferrer noopener"
                  data-downloadurl={`application/octet-stream:${kirtan.filename}:blob:${kirtan.cdnpath}`}
                  onClick={() => downloadFile(kirtan.cdnpath, kirtan.filename)}
                >
                  <img
                    src={DownloadIcon}
                    alt="download button"
                    className="button button__download"
                  />
                </a>
              </div>
            </div>
          </Row>
        );
      })}
    </section>
  );
}

export default KirtanList;
