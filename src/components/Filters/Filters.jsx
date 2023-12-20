// import {
//   Form,
//   ButtonGroup,
//   Dropdown,
//   DropdownButton,
//   DropDownTreeComponent,
// } from "react-bootstrap";

// function Filters({
//   allAlbums,
//   allArtists,
//   handleAlbumFilter,
//   handleArtistFilter,
// }) {
//   const handleAlbumDropdown = () => {
//     const selectedUrl = "http://localhost:3000/albumsFilter";
//     window.open(selectedUrl, "_parent");
//   };

//   const handleArtistDropdown = () => {
//     const selectedUrl = "http://localhost:3000/artistsFilter";
//     window.open(selectedUrl, "_parent");
//   };

//   return (
//     <>
//       {/* <form>
//         <select name="albums" id="albums">
//           <option value="" defaultValue={"Albums"}>
//             Albums
//           </option>
//           {allAlbums.map((allAlbum, index) => {
//             return (
//               <option key={index} onClick={(event) => handleAlbumFilter(event)}>
//                 <a href="#">{allAlbum}</a>
//               </option>
//             );
//           })}
//         </select>
//       </form>

//       <form>
//         <select name="artists" id="artists">
//           <option>Artists</option>
//           {allArtists.map((allArtist, index) => {
//             return (
//               <option
//                 key={index}
//                 onClick={(event) => handleArtistFilter(event)}
//               >
//                 <a href="#">{allArtist}</a>
//               </option>
//             );
//           })}
//         </select>
//       </form> */}

//       <DropdownButton
//         as={ButtonGroup}
//         key={"Info"}
//         id={`dropdown-variants-Info}`}
//         variant={"Info".toLowerCase()}
//         title={"Albums"}
//       >
//         {allAlbums.map((allAlbum, index) => {
//           return (
//             <Dropdown.Item eventKey={index}>
//               <Form.Check // prettier-ignore
//                 type="checkbox"
//                 id={index}
//                 label={allAlbum}
//               />
//             </Dropdown.Item>
//           );
//         })}
//         <Dropdown.Divider />
//         <Dropdown.Item>Show Kirtans</Dropdown.Item>
//       </DropdownButton>
//     </>
//   );
// }

// export default Filters;

import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

function Filters({
  allAlbums,
  handleAlbumFilter,
  allArtists,
  handleArtistFilter,
}) {
  allAlbums = allAlbums.map((album) => ({ value: album, label: album }));
  allArtists = allArtists.map((artist) => ({ value: artist, label: artist }));
  // console.log("allAlbums in Filters", allAlbums);
  // console.log("allArtists in Filters", allArtists);
  return (
    <>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={[]}
        isMulti
        options={allAlbums}
        onChange={(event) => handleAlbumFilter(event)}
      />
      <br />
      <br />
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={[]}
        isMulti
        options={allArtists}
        onChange={(event) => handleArtistFilter(event)}
      />
    </>
  );
}

export default Filters;
