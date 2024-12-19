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
    console.log("handleInputSearch called", action.payload);

    let kirtans = [...action.payload.allKirtans];
    if (action.payload.inputSearchString !== "" || action.payload.selectedAlbumFilters.length !== 0 || action.payload.selectedArtistFilters.length !== 0 ) {
        state.displayKirtans = getResultKirtans(kirtans, action.payload.inputSearchString, action.payload.selectedAlbumFilters, action.payload.selectedArtistFilters)
    }
    else {
        state.displayKirtans = action.payload.allKirtans;
    }
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
