import { configureStore } from "@reduxjs/toolkit";

import anecdoteReducer from "./anecdoteReducer";
import anecdoteFilterReducer from "./anecdoteFilterReducer";
import notificationReducer from "./notificationReducer";

export default configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    anecdoteFilter: anecdoteFilterReducer,
    notification: notificationReducer,
  },
});
