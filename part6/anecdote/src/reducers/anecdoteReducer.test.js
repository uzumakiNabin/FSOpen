import deepFreeze from "deep-freeze";
import anecdoteReducer from "./anecdoteReducer";

describe("unicafe reducer", () => {
  const initialState = [
    {
      id: 1,
      content: "If it hurts, do it more often.",
      vote: 0,
    },
  ];

  test("vote is incremented", () => {
    const action = {
      type: "VOTE",
      payload: { voteId: 1 },
    };
    const state = initialState;

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);
    expect(newState).toContainEqual({
      id: 1,
      content: "If it hurts, do it more often.",
      vote: 1,
    });
  });

  test("new anecdote is created with correct id pattern", () => {
    const action = {
      type: "ADD_ANECDOTE",
      payload: { content: "this is test anecdote" },
    };
    const state = initialState;

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);
    expect(newState).toHaveLength(2);
    expect(newState).toContainEqual({
      id: 2,
      content: "this is test anecdote",
      vote: 0,
    });
  });
});