import { useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const handleVoteClick = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(setNotification({ message: `you voted '${anecdote.content}'`, type: "success" }));
  };

  return (
    <div>
      <p>{anecdote.content}</p>
      <p>
        has {anecdote.vote}.<button onClick={() => handleVoteClick(anecdote)}>vote</button>
      </p>
    </div>
  );
};

export default Anecdote;
