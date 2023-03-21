import { useMutation, useQueryClient } from "react-query";
import { useContext } from "react";

import { createOne } from "../requests/anecdoteRequests";
import NotificationContext from "../contexts/NotificationContext";

const NewAnecdoteForm = () => {
  const notificationDispatch = useContext(NotificationContext)[1];
  const queryClient = useQueryClient();

  const anecdoteMutation = useMutation(createOne, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueriesData("anecdotes", anecdotes.concat(newAnecdote));
      notificationDispatch({ type: "SET", payload: { message: `you added '${newAnecdote.content}'`, type: "success", duration: 6 } });
    },
    onError: (err) => {
      notificationDispatch({ type: "SET", payload: { message: err.message, type: "error", duration: 6 } });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    anecdoteMutation.mutate(e.target.content.value);
    e.target.content.value = "";
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="content">Enter Anecdote:</label>
          <input name="content" type="text" />
        </div>
        <div>
          <button className="btn btn-add" type="submit">
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewAnecdoteForm;
