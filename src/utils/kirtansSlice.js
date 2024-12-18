import { createSlice } from "@reduxjs/toolkit";

const kirtansSlice = createSlice({
    name: "kirtans",
    initialState: {
        // allKirtans: [],         
        displayKirtans: [],
    },
    reducers: {
        // getAllKirtans : (state, action) => {
        //     state.allKirtans = action.payload;
        // },
        editScore: (state, action) => {
            state.allKirtans = [...state.allKirtans].map((kirtan) => {return {...kirtan, Score: action.payload}})
        },
        editScoreSingle: (state, action) => {
            if (state.allKirtans.length > 0) {
                state.allKirtans = [...state.allKirtans].map((kirtan, index) => {if (index === action.payload.index) {
                    return {...kirtan, Score: action.payload.scoreValue}
                }
                else {
                    return kirtan;
                }
            })
            }
        },
        populateHTitle: (state, action) => {
            // state.allKirtans[2].hTitle = "hijghf";
            if (state.allKirtans.length > 0) {
                state.allKirtans = [...state.allKirtans].map((kirtan, index) => {if (index === action.payload.index) {
                    return {...kirtan, hTitle: action.payload.newHTitle}
                }
                else {
                    return kirtan;
                }
            })
            }
        },
        populateHSevadar: (state, action) => {
            // state.allKirtans[2].hTitle = "hijghf";
            if (state.allKirtans.length > 0) {
                state.allKirtans = [...state.allKirtans].map((kirtan, index) => {if (index === action.payload.index) {
                    return {...kirtan, hSevadar: action.payload.newHSevadar}
                }
                else {
                    return kirtan;
                }
            })
            }
        },
        populateHAlbum: (state, action) => {
            // state.allKirtans[2].hTitle = "hijghf";
            if (state.allKirtans.length > 0) {
                state.allKirtans = [...state.allKirtans].map((kirtan, index) => {if (index === action.payload.index) {
                    return {...kirtan, hAlbum: action.payload.newHAlbum}
                }
                else {
                    return kirtan;
                }
            })
            }
        }
    }})

    export const {editScore, editScoreSingle, populateHTitle, populateHSevadar, populateHAlbum} = kirtansSlice.actions;
    export default kirtansSlice.reducer;