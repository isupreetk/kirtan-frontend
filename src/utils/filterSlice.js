import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    allAlbums: [],
    allArtists: [],
    selectedAlbumFilter: [],
    selectedArtistFilter: [],
  },
  reducers: {
    setAllAlbums: (state, action) => {
       state.allAlbums = action.payload;
    },
    setAllArtists: (state, action) => {
       state.allArtists = action.payload;
    },
    setSelectedAlbumFilters: (state, action) => {
     state.selectedAlbumFilter = [ ...state.selectedAlbumFilter, ...action.payload ];
    },
    setSelectedArtistFilters: (state, action) => {
     state.selectedArtistFilter = [ ...state.selectedArtistFilter, ...action.payload ];
    },
  },
});

export const { setAllAlbums, setAllArtists, setSelectedAlbumFilters, setSelectedArtistFilters } = filterSlice.actions;
export default filterSlice.reducer;
