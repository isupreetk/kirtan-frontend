import "./KirtanList.scss";

function KirtanList({ searchTerm, possibleCombinations, kirtans }) {
  //   console.log("1", possibleCombinations);

  const calculateScore = (kirtan) => {
    // console.log("kirtan", kirtan);

    // console.log("possibleCombinations", possibleCombinations);
    kirtan.Score = 0;
    for (let i = 0; i <= possibleCombinations.length - 1; i++) {
      let array = possibleCombinations[i];
      //   console.log("array", array);
      let arrayLength = array.length;
      //   console.log(arrayLength);
      let searchExists = true;
      array.forEach((element) => {
        // console.log("element", element);
        if (!kirtan.Title.toLowerCase().includes(element.toLowerCase())) {
          searchExists = false;
          console.log("searchExists", searchExists);
        }
        // console.log("score", kirtan.Score);
      });
      if (searchExists) {
        kirtan.Score = arrayLength;
        break;
      }
      //   });
    }

    if (kirtan.Score > 0) {
      return kirtan;
    } else {
      return false;
    }
  };

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
          ? kirtans
              .filter((kirtan) => {
                return calculateScore(kirtan);
              })
              .map((kirtan, index) => {
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
