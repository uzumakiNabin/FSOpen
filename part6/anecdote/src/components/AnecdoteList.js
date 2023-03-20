import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Anecdote from "./Anecdote";
import { initializeAnecdotes } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const list = useSelector(({ anecdotes, anecdoteFilter }) => anecdotes.filter((anecdote) => anecdote.content.includes(anecdoteFilter)));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      {list
        .sort((first, second) => second.vote - first.vote)
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        ))}
    </div>
  );
};

export default AnecdoteList;
