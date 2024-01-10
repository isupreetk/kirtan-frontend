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
  let searchURLAlbum = urlAlbum?.split(",");
  let searchURLArtist = urlArtist?.split(",");

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
              urlAlbum
                ? searchURLAlbum.map((album) => {
                    return { label: album, value: album };
                  })
                : []
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
              urlArtist
                ? searchURLArtist.map((artist) => {
                    return { label: artist, value: artist };
                  })
                : []
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
