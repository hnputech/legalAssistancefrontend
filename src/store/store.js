import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "./features/chatSlice";

export const store = configureStore({
  reducer: {
    file: fileReducer,
  }, //add reducers here
});
