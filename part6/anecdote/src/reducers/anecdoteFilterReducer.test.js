import deepFreeze from "deep-freeze";
import anecdoteFilterReducer from "./anecdoteFilterReducer";

describe("anecdote filter reducer", () => {
  const initialState = "";

  test("should return a proper initial state when called with undefined state", () => {
    const action = {
      type: "DO_NOTHING",
    };

    const newState = anecdoteFilterReducer(undefined, action);
    expect(newState).toBe("");
  });

  test("filter is changed", () => {
    const action = {
      type: "anecdoteFilter/setFilter",
      payload: "new filter",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = anecdoteFilterReducer(state, action);
    expect(newState).toBe(action.payload);
  });
});
