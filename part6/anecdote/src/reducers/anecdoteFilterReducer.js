import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const anecdoteFilterSlice = createSlice({
  name: "anecdoteFilter",
  initialState,
  reducers: {
    setFilter(state, action) {
      return action.payload;
    },
  },
});

export default anecdoteFilterSlice.reducer;

export const { setFilter } = anecdoteFilterSlice.actions;
