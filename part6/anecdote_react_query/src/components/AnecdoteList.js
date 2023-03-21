import { useQuery } from "react-query";

import Anecdote from "./Anecdote";
import { getAll } from "../requests/anecdoteRequests";

const AnecdoteList = () => {
  const result = useQuery("anecdotes", getAll, { refetchOnWindowFocus: false, retry: 1 });
  if (result.isLoading) {
    return <div>Loading data...</div>;
  }
  if (result.isError) {
    return <div>Anecdote service is not available due to problem in server.</div>;
  }
  const list = result.data;

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
