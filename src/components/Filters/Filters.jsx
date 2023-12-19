function Filters({ allAlbums, allArtists, handleAlbumFilter }) {
  return (
    <>
      {/* <form onSubmit={(event) => handleAlbumFilter(event)}>
        <fieldset>
          <label>Albums</label>
          <br />
          {allAlbums.map((allAlbum, index) => {
            return (
              <li key={index}>
                <input
                  type="checkbox"
                  name={allAlbum}
                  value={allAlbum}
                  onSelect={(event) => handleAlbumFilter(event)}
                />
                {allAlbum}
                <br />
              </li>
            );
          })}
          ;
          <input type="submit" value="Search now" />
        </fieldset>
      </form> */}
      <form>
        <select name="Albums" id="Albums">
          <option value="Albums">
            <a href="https://www.w3schools.com" target="_blank">
              Albums
            </a>
          </option>
        </select>
        <br />
        <br />
      </form>
    </>
  );
}

export default Filters;
