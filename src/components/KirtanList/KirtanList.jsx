import "./KirtanList.scss";

function KirtanList({
  searchTerm,
  //   possibleCombinations,
  kirtans,
  sortedKirtans,
  //   kirtanTitleRef,
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
          ? sortedKirtans.slice(0, 100).map((kirtan, index) => {
              return (
                <li className="kirtan-list__items" key={index}>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: kirtan.hTitle,
                    }}
                  />
                  {/* ref={kirtanTitleRef} */}
                  <p
                    dangerouslySetInnerHTML={{
                      __html: kirtan.hSevadar,
                    }}
                  />
                  {/* {kirtan.hSevadar}
                  </p> */}
                  <p>{kirtan.Duration}</p>
                  <p>{kirtan.date}</p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: kirtan.hAlbum,
                    }}
                  />
                  <p>{kirtan.Score}</p>
                  <button>Play</button>
                  <button>Download</button>
                </li>
              );
            })
          : kirtans.slice(0, 100).map((kirtan, index) => {
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
