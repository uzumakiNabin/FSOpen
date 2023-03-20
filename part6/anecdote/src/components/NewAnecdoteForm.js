import { useDispatch } from "react-redux";

import { addNewAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const NewAnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewAnecdote(e.target.content.value));
    dispatch(setNotification({ message: `you added '${e.target.content.value}'`, type: "success" }));
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
