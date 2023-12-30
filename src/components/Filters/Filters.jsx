import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

function Filters({
  allAlbums,
  handleAlbumFilter,
  allArtists,
  handleArtistFilter,
  urlAlbum,
}) {
  allAlbums = allAlbums.map((album) => ({ label: album, value: album }));
  allArtists = allArtists.map((artist) => ({ value: artist, label: artist }));
  allArtists = allArtists.sort((a, b) => {
    return a.label.localeCompare(b.label);
  });
  return (
    <>
      <div>
        <div className="filters__input">
          <Select
            placeholder="Select Samagam"
            closeMenuOnSelect={true}
            components={animatedComponents}
            defaultValue={
              urlAlbum ? [{ label: urlAlbum, value: urlAlbum }] : []
            }
            isMulti
            options={allAlbums}
            onChange={(event) => handleAlbumFilter(event)}
          />
        </div>
        <div className="filters__input">
          <Select
            closeMenuOnSelect={true}
            placeholder="Select Sevadar"
            components={animatedComponents}
            defaultValue={[]}
            isMulti
            options={allArtists}
            onChange={(event) => handleArtistFilter(event)}
            className="filters__input"
          />
        </div>
      </div>
    </>
  );
}

export default Filters;
