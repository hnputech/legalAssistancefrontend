import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  //   {
  //     fileid: "file-ar3rHTkG2jbFYM0iEoyNrOzV",
  //     threadid: "thread_sFCvUa4qYSFMkNZNZJo7ISa2",
  //     filename: "Q1. Legal Assistant testing.docx",
  //     storeid: "vs_a0UcPhlDPvVAZauBrIlLhMZT",
  //     size: null,
  //   },
];

export const chatFileSlice = createSlice({
  name: "chatFiles",
  initialState,
  reducers: {
    addFile: (state, action) => {
      // Ensure action.payload is an array and push its elements to the state array
      const objectsToAdd = Array.isArray(action.payload) ? action.payload : [];
      state.push(...objectsToAdd);
    },
    setThreadFiles: (state, action) => {
      return action.payload; // Override the entire array with a new set of objects
    },
  },
});

// Action creators are generated for each case reducer function
export const { addFile, setThreadFiles } = chatFileSlice.actions;

export default chatFileSlice.reducer;
