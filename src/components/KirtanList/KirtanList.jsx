import "./KirtanList.scss";
// import InfiniteScroll from "react-infinite-scroll-component";
import { Table } from "react-bootstrap";
import { FileEarmarkPlay, Download } from "react-bootstrap-icons";

function KirtanList({
  searchTerm,
  //   possibleCombinations,
  kirtans,
  sortedKirtans,
  isLoading,
  error,
  //   kirtanTitleRef,
}) {
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
  const mapToHtml = (kirtan, index) => {
    if (!kirtan.hTitle) kirtan.hTitle = kirtan.Title;
    if (!kirtan.hSevadar) kirtan.hSevadar = kirtan.Sevadar;
    if (!kirtan.hAlbum) kirtan.hAlbum = kirtan.Album;

    return (
      <tbody>
        <tr>
          {/* <li className="kirtan-list__items" key={index}> */}
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
          {/* <td>{kirtan.date}</td> */}
          <td
            dangerouslySetInnerHTML={{
              __html: kirtan.hAlbum,
            }}
          />

          {/* <td>{kirtan.Score}</td> */}
          <td>
            {/* <button> */}
            {/* <i class="bi bi-file-earmark-play-fill"></i> */}
            <FileEarmarkPlay />
            {/* </button> */}
          </td>
          <td>
            {/* <button>
              <i class="bi bi-download"></i>
            </button> */}
            <Download />
          </td>
          {/* </li> */}
        </tr>
      </tbody>
    );
  };
  return (
    <>
      {/* <ul className="kirtan-list"> */}
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Artist</th>
            <th>Duration</th>
            {/* <th>Date</th> */}
            <th>Album</th>
            {/* <th>Score</th> */}
            <th></th>
            <th></th>
          </tr>
        </thead>

        {searchTerm
          ? sortedKirtans.slice(0, 100).map(mapToHtml)
          : kirtans.slice(0, 100).map(mapToHtml)}
      </Table>
      {/* </ul> */}
    </>
  );
}

export default KirtanList;
