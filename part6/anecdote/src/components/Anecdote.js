import { useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { voteAnecdoteInServer } from "../services/AnecdoteServices";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const handleVoteClick = async (anecdote) => {
    try {
      const votedAnecdote = await voteAnecdoteInServer(anecdote);
      dispatch(voteAnecdote(votedAnecdote.id));
      dispatch(setNotification({ message: `you voted '${votedAnecdote.content}'`, type: "success" }));
    } catch (ex) {
      dispatch(setNotification({ message: ex.message, type: "error" }));
    }
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
