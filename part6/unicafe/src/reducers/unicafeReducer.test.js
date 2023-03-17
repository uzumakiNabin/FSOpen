import deepFreeze from "deep-freeze";
import unicafeReducer from "./unicafeReducer";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test("should return a proper initial state when called with undefined state", () => {
    const action = {
      type: "DO_NOTHING",
    };

    const newState = unicafeReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test.only("good is incremented", () => {
    const action = {
      type: "GOOD",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = unicafeReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });

    deepFreeze(newState);
    const afterSecondDispatch = unicafeReducer(newState, action);
    expect(afterSecondDispatch).toEqual({
      good: 2,
      ok: 0,
      bad: 0,
    });

    deepFreeze(afterSecondDispatch);
    const afterThirdDispatch = unicafeReducer(afterSecondDispatch, action);
    expect(afterThirdDispatch).toEqual({
      good: 3,
      ok: 0,
      bad: 0,
    });
  });

  test("ok is incremented", () => {
    const action = {
      type: "OK",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = unicafeReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    });
  });

  test("bad is incremented", () => {
    const action = {
      type: "BAD",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = unicafeReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    });
  });

  test("zero resets", () => {
    const goodAction = {
      type: "GOOD",
    };
    const goodState = initialState;

    deepFreeze(goodState);
    const afterGoodState = unicafeReducer(goodState, goodAction);
    expect(afterGoodState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });

    const action = {
      type: "ZERO",
    };

    deepFreeze(afterGoodState);
    const newState = unicafeReducer(afterGoodState, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0,
    });
  });
});