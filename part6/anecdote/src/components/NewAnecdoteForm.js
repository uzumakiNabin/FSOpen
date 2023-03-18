import { useDispatch } from "react-redux";

import { addNewAnecdote } from "../reducers/anecdoteReducer";

const NewAnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewAnecdote(e.target.content.value));
    e.target.content.value = "";
  };

  return (
    <div>
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
