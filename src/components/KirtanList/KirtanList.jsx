import "./KirtanList.scss";

function KirtanList({
  searchTerm,
  //   possibleCombinations,
  kirtans,
  sortedKirtans,
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
          <p>Score</p>
          <p>Play</p>
          <p>Download</p>
        </li>

        {searchTerm
          ? sortedKirtans.map((kirtan, index) => {
              return (
                <li className="kirtan-list__items" key={index}>
                  <p>{kirtan.Title}</p>
                  <p>{kirtan.Sevadar}</p>
                  <p>{kirtan.Duration}</p>
                  <p>{kirtan.date}</p>
                  <p>{kirtan.Album}</p>
                  <p>{kirtan.Score}</p>
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
                  <p>{kirtan.Score}</p>
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
