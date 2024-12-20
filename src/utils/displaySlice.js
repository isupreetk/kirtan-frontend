import { createSlice } from "@reduxjs/toolkit";
import { getResultKirtans } from "../utils";

const displaySlice = createSlice({
  name: "display",
  initialState: {
    inputSearchString: "",
    selectedAlbumFilters: [],
    selectedArtistFilters: [],
    displayKirtans: [],
  },
  reducers: {
    setSearchString: (state, action) => {
      state.inputSearchString = action.payload;
    },
    setSelectedAlbumFilter: (state, action) => {
      state.selectedAlbumFilters = action.payload;
    },
    setSelectedArtistFilter: (state, action) => {
      state.selectedArtistFilters = action.payload;
    },
    handleInputSearch: (state, action) => {
      let kirtans = [...action.payload.allKirtans];
      state.displayKirtans = getResultKirtans(
        kirtans,
        action.payload.inputSearchString,
        action.payload.selectedAlbumFilters,
        action.payload.selectedArtistFilters
      );
    },
  },
});

export const {
  setSearchString,
  setSelectedAlbumFilter,
  setSelectedArtistFilter,
  handleInputSearch,
} = displaySlice.actions;
export default displaySlice.reducer;
