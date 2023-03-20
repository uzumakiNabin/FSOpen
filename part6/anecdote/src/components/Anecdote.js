import { useDispatch } from "react-redux";
import { castVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const handleVoteClick = (anecdote) => {
    dispatch(castVote(anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, "success", 4));
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
