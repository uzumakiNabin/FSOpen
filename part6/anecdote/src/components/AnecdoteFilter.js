import { useDispatch } from "react-redux";

import { setFilter } from "../reducers/anecdoteFilterReducer";

const AnecdoteFilter = () => {
  const dispatch = useDispatch();

  return (
    <>
      <label htmlFor="filterinput">filter:</label>
      <input id="filterinput" onChange={(e) => dispatch(setFilter(e.target.value))} />
    </>
  );
};

export default AnecdoteFilter;
