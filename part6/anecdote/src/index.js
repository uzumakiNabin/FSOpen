import ReactDOM from "react-dom/client";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import anecdoteReducer from "./reducers/anecdoteReducer";
import anecdoteFilterReducer from "./reducers/anecdoteFilterReducer";
import App from "./App";
import "./index.css";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  anecdoteFilter: anecdoteFilterReducer,
});

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
