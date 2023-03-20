import deepFreeze from "deep-freeze";
import notificationReducer from "./notificationReducer";

describe("notification reducer", () => {
  const initialState = { message: "", type: "" };

  test("should return a proper initial state when called with undefined state", () => {
    const action = {
      type: "DO_NOTHING",
    };

    const newState = notificationReducer(undefined, action);
    expect(newState).toEqual({ message: "", type: "" });
  });

  test("notification is set properly", () => {
    const action = {
      type: "notification/setNotification",
      payload: { message: "test notification", type: "testtype" },
    };
    const state = initialState;

    deepFreeze(state);
    const newState = notificationReducer(state, action);
    expect(newState).toEqual(action.payload);
  });

  test("notification is reset", () => {
    const setAction = {
      type: "notification/setNotification",
      payload: { message: "test notification", type: "testtype" },
    };
    const state = initialState;

    deepFreeze(state);
    const newState = notificationReducer(state, setAction);
    expect(newState).toEqual(setAction.payload);
    const resetAction = {
      type: "notification/resetNotification",
    };

    deepFreeze(newState);
    const resetState = notificationReducer(state, resetAction);
    expect(resetState).toEqual(initialState);
  });
});
