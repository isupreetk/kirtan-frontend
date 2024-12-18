import { configureStore } from "@reduxjs/toolkit";
import kirtansReducer from "./kirtansSlice";
import searchReducer from "./searchSlice";
import filterReducer from "./filterSlice";
import globalDataReducer from "./globalDataSlice";
import displayReducer from "./displaySlice";

const appStore = configureStore({
    reducer: {
        globalData: globalDataReducer,
        display: displayReducer,
        // kirtans: kirtansReducer,
        search: searchReducer,
        filters: filterReducer,
    }
})

export default appStore;