import "./KirtanList.scss";
// import InfiniteScroll from "react-infinite-scroll-component";
import { Table } from "react-bootstrap";
import { FileEarmarkPlay, Download } from "react-bootstrap-icons";
// import { useState } from "react";

function KirtanList({
  searchTerm,
  kirtans,
  sortedKirtans,
  isLoading,
  error,
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
      <tbody>
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
          <td>{kirtan.Duration}</td>
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
  return (
    <>
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Artist</th>
            <th>Duration</th>
            <th>Album</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        {searchTerm
          ? sortedKirtans.slice(0, 100).map(mapToHtml)
          : kirtans.slice(0, 100).map(mapToHtml)}
      </Table>
    </>
  );
}

export default KirtanList;
