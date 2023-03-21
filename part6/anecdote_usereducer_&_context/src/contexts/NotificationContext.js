import { createContext, useReducer } from "react";

const initialState = { message: "", type: "", duration: 0 };

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return { message: action.payload.message, type: action.payload.type, duration: action.payload.duration };
    case "RESET":
      return { message: "", type: "", duration: 0 };
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, initialState);

  return <NotificationContext.Provider value={[notification, notificationDispatch]}>{props.children}</NotificationContext.Provider>;
};

export default NotificationContext;
