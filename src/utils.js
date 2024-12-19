export const toPascalCase = (str) =>
  str
    .split(" ")
    .map((x) => {
      if (x.indexOf("<strong>") === 0) {
        return (
          "<strong>" + x.charAt(8).toUpperCase() + x.slice(9).toLowerCase()
        );
      } else {
        return x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();
      }
    })
    .join(" ");

const calculateKirtanScore = (kirtan, possibleCombinations) => {
  let mutatedKirtan = {
    ...kirtan,
    Score: 0,
    hTitle: kirtan.Title,
    hAlbum: kirtan.Album,
    hSevadar: kirtan.Sevadar,
  };

  for (let i = 0; i <= possibleCombinations?.length - 1; i++) {
    let array = possibleCombinations[i];
    let arrayLength = array.length;
    let searchExists = true;
    if (arrayLength === 0) continue;
    array.forEach((element) => {
      if (
        !(
          mutatedKirtan.Title.toString()
            .toLowerCase()
            .includes(element.toLowerCase()) ||
          mutatedKirtan.Sevadar.toLowerCase().includes(element.toLowerCase()) ||
          mutatedKirtan.Album.toLowerCase().includes(element.toLowerCase()) ||
          mutatedKirtan.audio_year?.toString().includes(element) ||
          mutatedKirtan.Titlefws.toString()
            .toLowerCase()
            .includes(element.toLowerCase())
        )
      ) {
        searchExists = false;
      }
    });

    if (searchExists) {
      mutatedKirtan.Score = arrayLength;
      array.forEach((word) => {
        mutatedKirtan.hTitle = mutatedKirtan.hTitle
          .toString()
          ?.toLowerCase()
          .replace(word?.toLowerCase(), `<strong>${word}</strong>`);

        mutatedKirtan.hTitle = toPascalCase(mutatedKirtan.hTitle);

        mutatedKirtan.hSevadar = mutatedKirtan.hSevadar
          .toString()
          ?.toLowerCase()
          .replace(word?.toLowerCase(), `<strong>${word}</strong>`);

        mutatedKirtan.hSevadar = toPascalCase(mutatedKirtan.hSevadar);

        mutatedKirtan.hAlbum = mutatedKirtan.hAlbum
          .toString()
          ?.toLowerCase()
          .replace(word?.toLowerCase(), `<strong>${word}</strong>`);

        mutatedKirtan.hAlbum = toPascalCase(mutatedKirtan.hAlbum);
      });

      break;
    }
  }
  if (mutatedKirtan.Score > 0) {
    return mutatedKirtan;
  } else {
    return false;
  }
};

const getPossibleCombinations = (inputSearchString) => {
  let searchArray = inputSearchString?.split(" ");
  searchArray = searchArray.filter((s) => s !== "");
  return searchArray
    .reduce(
      (subsets, value) => subsets.concat(subsets.map((set) => [value, ...set])),
      [[]]
    )
    .sort((a, b) => {
      return b.length - a.length;
    });
};

const getSearchedKirtans = (kirtans, possibleCombinations) => {
  let searchedMutatedKirtans = [];
  kirtans?.forEach((kirtan, index) => {
    let result = calculateKirtanScore(kirtan, possibleCombinations);
    if (result) {
      searchedMutatedKirtans.push(result);
    }
  });
  return searchedMutatedKirtans;
};

const getSortedSearchedKirtans = (searchedKirtans) => {
  let sortedData = searchedKirtans?.sort((a, b) => {
    return b.Score - a.Score;
  });
  if (sortedData?.length > 0) {
    return sortedData;
  } else {
    return searchedKirtans;
  }
};

const getAlbumFilteredKirtans = (
  sortedSearchedKirtans,
  selectedAlbumFilters
) => {
  if (selectedAlbumFilters.length === 0) {
    return sortedSearchedKirtans;
  } else {
    return sortedSearchedKirtans.filter((item) => {
      return selectedAlbumFilters.includes(item.Album);
    });
  }
};

const getArtistFilteredKirtans = (
  albumFilteredKirtans,
  selectedArtistFilters
) => {
  if (selectedArtistFilters.length === 0) {
    return albumFilteredKirtans;
  } else {
    return albumFilteredKirtans.filter((item) => {
      return selectedArtistFilters.includes(item.Sevadar);
    });
  }
};

export const getResultKirtans = (
  kirtans,
  inputSearchString,
  selectedAlbumFilters,
  selectedArtistFilters
) => {
  let searchedKirtans;
  if (inputSearchString !== "") {
    let possibleCombinations = getPossibleCombinations(inputSearchString);

    searchedKirtans = getSearchedKirtans(kirtans, possibleCombinations);
  } else {
    searchedKirtans = kirtans;
  }

  let sortedSearchedKirtans = getSortedSearchedKirtans(searchedKirtans);
  
  let albumFilteredKirtans = getAlbumFilteredKirtans(
    sortedSearchedKirtans,
    selectedAlbumFilters
  );
  
  let artistFilteredKirtans = getArtistFilteredKirtans(
    albumFilteredKirtans,
    selectedArtistFilters
  );

  return artistFilteredKirtans;
};
