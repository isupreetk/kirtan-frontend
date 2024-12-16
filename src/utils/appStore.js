import { configureStore } from "@reduxjs/toolkit";
import kirtansReducer from "./kirtansSlice";
import searchReducer from "./searchSlice";

const appStore = configureStore({
    reducer: {
        kirtans: kirtansReducer,
        search: searchReducer,
    }
})

export default appStore;