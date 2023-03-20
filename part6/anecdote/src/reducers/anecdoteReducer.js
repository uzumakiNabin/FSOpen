import { createSlice } from "@reduxjs/toolkit";

import { getAnecdotesFromServer, createAnecdoteInServer, voteAnecdoteInServer } from "../services/AnecdoteServices";

const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const voteId = action.payload;
      return state.map((anecdote) => {
        if (anecdote.id === voteId) {
          return { ...anecdote, vote: anecdote.vote + 1 };
        } else {
          return { ...anecdote };
        }
      });
    },
    resetVotes(state) {
      return state.map((anecdote) => ({ ...anecdote, vote: 0 }));
    },
    addNewAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export default anecdoteSlice.reducer;
export const { voteAnecdote, resetVotes, addNewAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotesFromServer = await getAnecdotesFromServer();
    dispatch(setAnecdotes(anecdotesFromServer));
  };
};

export const addAnecdote = (anecdoteContent) => {
  return async (dispatch) => {
    const newAnecdote = await createAnecdoteInServer(anecdoteContent);
    dispatch(addNewAnecdote(newAnecdote));
  };
};

export const castVote = (anecdoteToVote) => {
  return async (dispatch) => {
    const votedAnecdote = await voteAnecdoteInServer(anecdoteToVote);
    dispatch(voteAnecdote(votedAnecdote.id));
  };
};
