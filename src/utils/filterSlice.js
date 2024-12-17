import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    allAlbums: [],
    allArtists: [],
    albumFilter: [],
    artistFilter: [],
  },
  reducers: {
    setAllAlbums: (state, action) => {
       state.allAlbums = action.payload;
    },
    setAllArtists: (state, action) => {
       state.allArtists = action.payload;
    },
    getAppliedAlbumFilters: (state, action) => {
     state.albumFilter = [ ...state.albumFilter, ...action.payload ];
    },
    getAppliedArtistFilters: (state, action) => {
     state.artistFilter = [ ...state.artistFilter, ...action.payload ];
    },
  },
});

export const { setAllAlbums, setAllArtists, getAppliedAlbumFilters, getAppliedArtistFilters } = filterSlice.actions;
export default filterSlice.reducer;
