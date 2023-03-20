import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Anecdote from "./Anecdote";
import { getAnecdotesFromServer } from "../services/AnecdoteServices";
import { setAnecdotes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const list = useSelector(({ anecdotes, anecdoteFilter }) => anecdotes.filter((anecdote) => anecdote.content.includes(anecdoteFilter)));

  const dispatch = useDispatch();

  useEffect(() => {
    const getAllAnecdotesAndSet = async () => {
      try {
        const anecdotesFromBackend = await getAnecdotesFromServer();
        dispatch(setAnecdotes(anecdotesFromBackend));
      } catch (ex) {
        dispatch(setNotification({ message: ex.message, type: "error" }));
      }
    };
    getAllAnecdotesAndSet();
  }, []);

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
