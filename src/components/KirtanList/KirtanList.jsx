import "./KirtanList.scss";
// import InfiniteScroll from "react-infinite-scroll-component";
import { Container, Table } from "react-bootstrap";
import { FileEarmarkPlay, Download } from "react-bootstrap-icons";
// import {  useEffect } from "react";

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
  handleFilters,
  handleAlbumFilter,
  handleArtistFilter,
  //   displayAlbumFilterKirtans,
  //   kirtanTitleRef,
}) {
  //   let [play, setPlay] = useState(false);

  if (isLoading) {
    return <h2>...Loading</h2>;
  }
  //   const InfiniteScrollExample = () => {

  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     setError(null);

  //     try {
  //       const response = await fetch(
  //         `https://api.example.com/items?page=${page}`
  //       );
  //       const data = await response.json();

  //       setItems((prevItems) => [...prevItems, ...data]);
  //       setPage((prevPage) => prevPage + 1);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  //   };

  //   const handlePlay = (event) => {
  //     event.preventDefault();
  //     setPlay = true;
  //     console.log("setPlay", setPlay);
  //   };

  const mapToHtml = (kirtan, index) => {
    if (!kirtan.hTitle) kirtan.hTitle = kirtan.Title;
    if (!kirtan.hSevadar) kirtan.hSevadar = kirtan.Sevadar;
    if (!kirtan.hAlbum) kirtan.hAlbum = kirtan.Album;

    return (
      <tbody key={index}>
        <tr>
          <td
            dangerouslySetInnerHTML={{
              __html: kirtan.hTitle,
            }}
          />
          {/* ref={kirtanTitleRef} */}

          <td
            dangerouslySetInnerHTML={{
              __html: kirtan.hSevadar,
            }}
          />
          <td
            dangerouslySetInnerHTML={{
              __html: kirtan.hAlbum,
            }}
          />
          <td>
            <a href={kirtan.cdnpath} target="_blank" rel="noopener noreferrer">
              <FileEarmarkPlay />
            </a>
          </td>
          <td>
            <a
              //   title="Right click and save as"
              //   download="Naam Simran.mp3"
              //   content-type="application/octet-stream"
              //   content-disposition="attachment"
              target="_blank"
              rel="noopener noreferrer"
              href={kirtan.cdnpath}
              //   data-downloadurl="application/octet-stream:https://brahmbungadodra.org/kirtanrecords/samagams/September23/01%20Jaspreet%20Kaur%20LDH%20-%20Naam%20Simran%20%2823-09-23%29E.mp3"
              // data-downloadurl="application/octet-stream:Naam+Simran.mp3:blob:https://brahmbungadodra.org/kirtanrecords/samagams/September23/01%20Jaspreet%20Kaur%20LDH%20-%20Naam%20Simran%20%2823-09-23%29E.mp3"
              //   rel="noreferrer"
              //   download={kirtan.cdnpath}
              //   download
            >
              <Download />
            </a>
          </td>
        </tr>
        {/* <tr> */}
        {/* {setPlay ? (
            <figure>
              <figcaption>Listening to {kirtan.Title}:</figcaption>
              <audio controls src={kirtan.cdnpath}>
                <a href={kirtan.cdnpath}> Download audio </a>
              </audio>
            </figure>
          ) : (
            <></>
          )} */}
        {/* </tr> */}
      </tbody>
    );
  };

  //   const handleAlbumFilter = (event) => {
  //     event.preventDefault();
  //     albumFilter.push(event.target.innerText);
  //     setAlbumFilter(albumFilter);
  //     console.log("AlbumFilter", albumFilter);
  //     // handleFilters(displayKirtans);
  //   };

  //   const handleArtistFilter = (event) => {
  //     event.preventDefault();
  //     artistFilter.push(event.target.innerText);
  //     setArtistFilter(artistFilter);
  //     console.log("ArtistFilter", artistFilter);
  //   };

  return (
    <>
      <Container>
        <div>
          <ul>
            <p>Album</p>
            {/* {kirtans?.slice(0, 10).map((kirtan, index) => {
              //   console.log(kirtan.Album);
              return (
                <li key={index}>
                  <a href="#" onClick={(event) => handleAlbumFilter(event)}>
                    {kirtan.Album}
                  </a>
                </li>
              );
            })} */}
            {allAlbums.map((allAlbum, index) => {
              return (
                <li key={index} onClick={(event) => handleAlbumFilter(event)}>
                  <a href="#">{allAlbum}</a>
                </li>
              );
            })}
          </ul>
          <ul>
            <p>Artist</p>
            {/* {kirtans?.slice(0, 10).map((kirtan, index) => {
              //   console.log(kirtan.Sevadar);
              return (
                <li key={index}>
                  <a href="#" onClick={(event) => handleArtistFilter(event)}>
                    {kirtan.Sevadar}
                  </a>
                </li>
              );
            })} */}
            {allArtists.map((allArtist, index) => {
              return (
                <li key={index} onClick={(event) => handleArtistFilter(event)}>
                  <a href="#">{allArtist}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <Table striped bordered hover className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Artist</th>
              <th>Album</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {/* 
        {searchTerm
          ? sortedKirtans.slice(0, 100).map(mapToHtml)
          : kirtans.slice(0, 100).map(mapToHtml)} */}

          {displayKirtans.map(mapToHtml)}
        </Table>
      </Container>
    </>
  );
}

export default KirtanList;
