import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import { Provider } from "react-redux";

import anecdoteReducer from "./reducers/anecdoteReducer";
import App from "./App";
import "./index.css";

const store = createStore(anecdoteReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
