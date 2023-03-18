import { useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <p>{anecdote.content}</p>
      <p>
        has {anecdote.vote}.<button onClick={() => dispatch(voteAnecdote(anecdote.id))}>vote</button>
      </p>
    </div>
  );
};

export default Anecdote;
