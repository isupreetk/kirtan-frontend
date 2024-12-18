import { createSlice } from "@reduxjs/toolkit";

const globalDataSlice = createSlice({
    name: "globalData",
    initialState: {
        allKirtans: [],
        allAlbums: [],
        allArtists: [],
    }, 
    reducers: {
        addAllKirtans : (state, action) => {
            state.allKirtans = action.payload
        },
        addAllAlbums: (state, action) => {
            let allAlbumsSet = new Set();
            action.payload.forEach((kirtan) => {
                // console.log(kirtan);
             allAlbumsSet.add(kirtan.Album)});
            state.allAlbums = [...allAlbumsSet];
        },
        addAllArtists : (state, action) => {
            let allArtistsSet = new Set();
            action.payload.forEach((kirtan) => allArtistsSet.add(kirtan.Sevadar));
            state.allArtists = [...allArtistsSet];
        }
    }
})

export const {addAllKirtans, addAllAlbums, addAllArtists} = globalDataSlice.actions;
export default globalDataSlice.reducer;