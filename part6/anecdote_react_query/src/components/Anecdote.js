import { useMutation, useQueryClient } from "react-query";

import { voteOne } from "../requests/anecdoteRequests";

const Anecdote = ({ anecdote }) => {
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
