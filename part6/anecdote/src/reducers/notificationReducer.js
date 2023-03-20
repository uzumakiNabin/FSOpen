import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "",
};

const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    resetNotification(state) {
      state.message = "";
      state.type = "";
    },
  },
});

export default NotificationSlice.reducer;

export const { setNotification, resetNotification } = NotificationSlice.actions;
