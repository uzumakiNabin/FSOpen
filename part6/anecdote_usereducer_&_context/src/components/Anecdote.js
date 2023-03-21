import { useMutation, useQueryClient } from "react-query";
import { useContext } from "react";

import { voteOne } from "../requests/anecdoteRequests";
import NotificationContext from "../contexts/NotificationContext";

const Anecdote = ({ anecdote }) => {
  const notificationDispatch = useContext(NotificationContext)[1];
  const queryClient = useQueryClient();

  const voteAnecdoteMutation = useMutation(voteOne, {
    onSuccess: (votedAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData(
        "anecdotes",
        anecdotes.map((anecdote) => {
          if (anecdote.id === votedAnecdote.id) {
            return votedAnecdote;
          } else {
            return anecdote;
          }
        })
      );
      notificationDispatch({ type: "SET", payload: { message: `you voted '${anecdote.content}'`, type: "success", duration: 4 } });
    },
  });
  return (
    <div>
      <p>{anecdote.content}</p>
      <p>
        has {anecdote.vote}.<button onClick={() => voteAnecdoteMutation.mutate(anecdote)}>vote</button>
      </p>
    </div>
  );
};

export default Anecdote;
