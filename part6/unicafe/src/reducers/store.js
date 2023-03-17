import { createStore } from "redux";
import unicafeReducer from "./unicafeReducer";

export default createStore(unicafeReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
