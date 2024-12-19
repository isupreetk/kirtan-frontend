import { configureStore } from "@reduxjs/toolkit";
import globalDataReducer from "./globalDataSlice";
import displayReducer from "./displaySlice";

const appStore = configureStore({
    reducer: {
        globalData: globalDataReducer,
        display: displayReducer,
    }
})

export default appStore;