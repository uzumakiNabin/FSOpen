import { useDispatch } from "react-redux";

import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const NewAnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAnecdote(e.target.content.value));
    dispatch(setNotification(`you added '${e.target.content.value}'`, "success", 6));
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
