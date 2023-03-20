import { useDispatch } from "react-redux";

import { addNewAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { createAnecdoteInServer } from "../services/AnecdoteServices";

const NewAnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newAnecdote = await createAnecdoteInServer(e.target.content.value);
      dispatch(addNewAnecdote(newAnecdote));
      dispatch(setNotification({ message: `you added '${newAnecdote.content}'`, type: "success" }));
      e.target.content.value = "";
    } catch (ex) {
      dispatch(setNotification({ message: ex.message, type: "error" }));
    }
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
