const initialState = "";

const anecdoteFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload;
    default:
      return state;
  }
};

export default anecdoteFilterReducer;

export const setFilter = (filterText) => {
  return { type: "SET_FILTER", payload: filterText };
};
