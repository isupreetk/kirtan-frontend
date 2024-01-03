import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

function Filters({
  allAlbums,
  handleAlbumFilter,
  allArtists,
  handleArtistFilter,
  urlAlbum,
  urlArtist,
}) {
  allAlbums = allAlbums.map((album) => ({ label: album, value: album }));
  allArtists = allArtists.map((artist) => ({ value: artist, label: artist }));
  allArtists = allArtists.sort((a, b) => {
    return a.label.localeCompare(b.label);
  });
  return (
    <>
      <section className="filters">
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
            defaultValue={
              urlArtist ? [{ label: urlArtist, value: urlArtist }] : []
            }
            isMulti
            options={allArtists}
            onChange={(event) => handleArtistFilter(event)}
            className="filters__input"
          />
        </div>
      </section>
    </>
  );
}

export default Filters;
