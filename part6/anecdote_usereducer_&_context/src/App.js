import { useState } from "react";

import AnecdoteList from "./components/AnecdoteList";
import NewAnecdoteForm from "./components/NewAnecdoteForm";
import AnecdoteFilter from "./components/AnecdoteFilter";
import Notification from "./components/Notification";

const App = () => {
  const [filter, setFilter] = useState("");
  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <AnecdoteFilter filter={filter} setFilter={setFilter} />
      <AnecdoteList filter={filter} />
      <NewAnecdoteForm />
    </div>
  );
};

export default App;
