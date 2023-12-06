import "./KirtanList.scss";
// import kirtans from "../../assets/data/kirtans.json";

function KirtanList({
  searchTerm,
  searchArray,
  possibleCombinations,
  kirtans,
}) {
  return (
    <>
      <ul className="kirtan-list">
        <li className="kirtan-list__items">
          <p>Name</p>
          <p>Artist</p>
          <p>Duration</p>
          <p>Date</p>
          <p>Album</p>
          <p>Play</p>
          <p>Download</p>
        </li>
        {/* {searchTerm
          ? kirtans
              .filter(
                (kirtan) =>
                  kirtan.Title.toLowerCase().includes(
                    searchTerm.toLowerCase()
                  ) ||
                  kirtan.Sevadar.toLowerCase().includes(
                    searchTerm.toLowerCase()
                  ) ||
                  kirtan.Album.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((kirtan, index) => {
                return (
                  <li className="kirtan-list__items" key={index}>
                    <p>{kirtan.Title}</p>
                    <p>{kirtan.Sevadar}</p>
                    <p>{kirtan.Duration}</p>
                    <p>{kirtan.date}</p>
                    <p>{kirtan.Album}</p>
                    <button>Play</button>
                    <button>Download</button>
                  </li>
                );
              })
          : kirtans.map((kirtan, index) => {
              return (
                <li className="kirtan-list__items" key={index}>
                  <p>{kirtan.Title}</p>
                  <p>{kirtan.Sevadar}</p>
                  <p>{kirtan.Duration}</p>
                  <p>{kirtan.date}</p>
                  <p>{kirtan.Album}</p>
                  <button>Play</button>
                  <button>Download</button>
                </li>
              );
            })*/}
        {searchTerm
          ? kirtans.filter((kirtan) => {
              return possibleCombinations.forEach((array) => {
                array.forEach((element) => {
                  kirtan.Title.toLowerCase().includes(element.toLowerCase());
                  return (
                    <li className="kirtan-list__items" key={kirtan.Title}>
                      <p>{kirtan.Title}</p>
                      <p>{kirtan.Sevadar}</p>
                      <p>{kirtan.Duration}</p>
                      <p>{kirtan.date}</p>
                      <p>{kirtan.Album}</p>
                      <button>Play</button>
                      <button>Download</button>
                    </li>
                  );
                });
              });
            })
          : kirtans.map((kirtan, index) => {
              return (
                <li className="kirtan-list__items" key={index}>
                  <p>{kirtan.Title}</p>
                  <p>{kirtan.Sevadar}</p>
                  <p>{kirtan.Duration}</p>
                  <p>{kirtan.date}</p>
                  <p>{kirtan.Album}</p>
                  <button>Play</button>
                  <button>Download</button>
                </li>
              );
            })}
      </ul>
    </>
  );
}

export default KirtanList;
