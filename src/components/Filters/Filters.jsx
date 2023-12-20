function Filters() {
  const handleAlbumDropdown = () => {
    const selectedUrl = "http://localhost:3000/albumsFilter";
    window.open(selectedUrl, "_parent");
  };

  const handleArtistDropdown = () => {
    const selectedUrl = "http://localhost:3000/artistsFilter";
    window.open(selectedUrl, "_parent");
  };

  return (
    <>
      <form>
        <select name="albums" id="albums" onClick={handleAlbumDropdown}>
          <option selected>Albums</option>
        </select>
      </form>

      <form>
        <select name="artists" id="artists" onClick={handleArtistDropdown}>
          <option selected>Artists</option>
        </select>
      </form>
    </>
  );
}

export default Filters;
