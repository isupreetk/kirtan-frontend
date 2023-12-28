import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Col } from "react-bootstrap";
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
      <Col xs={1}></Col>
      <Col>
        <Select
          placeholder="Select Samagam/Album"
          closeMenuOnSelect={true}
          components={animatedComponents}
          defaultValue={urlAlbum ? [{ label: urlAlbum, value: urlAlbum }] : []}
          isMulti
          options={allAlbums}
          onChange={(event) => handleAlbumFilter(event)}
        />
      </Col>
      <Col>
        <Select
          closeMenuOnSelect={true}
          placeholder="Select Sevadar"
          components={animatedComponents}
          defaultValue={[]}
          isMulti
          options={allArtists}
          onChange={(event) => handleArtistFilter(event)}
        />
      </Col>
      <Col xs={1}></Col>
    </>
  );
}

export default Filters;
