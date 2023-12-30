import "./KirtanList.scss";
// import InfiniteScroll from "react-infinite-scroll-component";
import { Row } from "react-bootstrap";
// import { Download } from "react-bootstrap-icons";
import PlayIcon from "../../assets/images/play-icon.png";
import PauseIcon from "../../assets/images/pause-icon.png";
import DownloadIcon from "../../assets/images/download-icon.png";
// FileEarmarkPlay
// import { useState } from "react";
// import { useRef } from "react";
// import ToastMessage from "../ToastMessage/ToastMessage";

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
  selectedKirtan,
  setSelectedKirtan,
  play,
  setPlay,
  togglePlay,
}) {
  //   let [playPauseIconStatus, setPlayPauseIconStatus] = useState({ PlayIcon });
  //   let [playPauseIcon, setPlayPauseIcon] = useState("play button");

  //   let playPauseRef = useRef();

  //   console.log(playPauseIconStatus);
  if (isLoading) {
    return <h2>...Loading</h2>;
  }

  const handleKirtanClick = (kirtan) => {
    if (selectedKirtan === kirtan) {
      let player = document.getElementById("audio");
      play === true ? player.pause() : player.play();
    } else {
      setSelectedKirtan(kirtan);
    }
  };

  //   const handleDownload = (kirtan) => {
  //     return !window.open(kirtan.cdnpath);
  //   };

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
      {displayKirtans.map((kirtan) => {
        if (!kirtan.hTitle) kirtan.hTitle = kirtan.Title;
        if (!kirtan.hSevadar) kirtan.hSevadar = kirtan.Sevadar;
        if (!kirtan.hAlbum) kirtan.hAlbum = kirtan.Album;
        return (
          <Row key={kirtan.aid}>
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
                {/* <p onClick={() => handleKirtanPlay(kirtan)}>
                  <Download className="button__download" />
                </p> */}
                {/* <form method="get" action={kirtan.cdnpath}>
                  <button type="submit">
                    <Download className="button__download" />
                  </button>
                </form> */}

                {play !== true || selectedKirtan !== kirtan ? (
                  <p onClick={() => handleKirtanClick(kirtan)}>
                    <img
                      // src={!pauseIconStatus ? PlayIcon : PauseIcon}
                      src={PlayIcon}
                      //   id={`play${kirtan.aid}`}
                      // ref={playPauseRef}
                      alt="play button"
                      className="button button__play"

                      // onClick={() => togglePlay(kirtan)}
                    />
                  </p>
                ) : (
                  <p onClick={() => handleKirtanClick(kirtan)}>
                    <img
                      // src={!pauseIconStatus ? PlayIcon : PauseIcon}
                      src={PauseIcon}
                      //   id={`pause${kirtan.aid}`}
                      // ref={playPauseRef}
                      alt="pause button"
                      className="button button__pause"
                      // onClick={() => togglePlay(kirtan)}
                    />
                  </p>
                )}
                {/* <p className="button"></p> */}
                <a
                  href={kirtan.cdnpath}
                  //   title="Right click and save as"
                  download={kirtan.filename}
                  type="application/octet-stream"
                  disposition="attachment"
                  target="_blank"
                  rel="noreferrer noopener"
                  data-downloadurl={`application/octet-stream:${kirtan.filename}:blob:${kirtan.cdnpath}`}
                  //   className="download_mp3"
                  onClick={() => downloadFile(kirtan.cdnpath, kirtan.filename)}
                >
                  {/* <Download className="button__download" /> */}
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
      {/* <ToastMessage /> */}
    </section>
  );
}

export default KirtanList;
