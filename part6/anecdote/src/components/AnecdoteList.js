import { useSelector } from "react-redux";

import Anecdote from "./Anecdote";

const AnecdoteList = () => {
  const list = useSelector(({ anecdotes, anecdoteFilter }) => anecdotes.filter((anecdote) => anecdote.content.includes(anecdoteFilter)));
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
