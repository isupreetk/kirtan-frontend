import { createSlice } from "@reduxjs/toolkit";

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
      if (action.payload.inputSearchString !== "") {
        let searchMatchKirtans = action.payload.allKirtans.filter((kirtan) =>
          kirtan.Title.includes(action.payload.inputSearchString)
        );
        state.displayKirtans = searchMatchKirtans;
      } else {
        state.displayKirtans = action.payload.allKirtans.slice(0, 500);
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
