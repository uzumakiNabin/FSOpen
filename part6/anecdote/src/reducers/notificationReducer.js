import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "",
  duration: "",
};

const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    set(state, action) {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.duration = action.payload.duration;
    },
    reset(state) {
      state.message = "";
      state.type = "";
      state.duration = "";
    },
  },
});

export default NotificationSlice.reducer;

export const { set, reset } = NotificationSlice.actions;

export const setNotification = (message, type, duration) => {
  return async (dispatch) => {
    dispatch(set({ message, type, duration }));
  };
};

export const resetNotification = () => {
  return async (dispatch) => {
    dispatch(reset());
  };
};
