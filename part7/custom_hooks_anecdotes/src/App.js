import { useState } from "react";
import { Routes, Route, Link, useMatch } from "react-router-dom";

import Anecdotes from "./components/Anecdotes";
import CreateAnecdote from "./components/CreateAnecdote";
import Anecdote from "./components/Anecdote";
import Notification from "./components/Notification";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      id: 1,
      content: "If it hurts, do it more often",
      vote: 0,
      author: "Jez Humble",
      url: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
    },
    {
      id: 2,
      content: "Premature optimization is the root of all evil.",
      vote: 0,
      author: "Donald Knuth",
      url: "https://stackify.com/premature-optimization-evil/",
    },
  ]);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const match = useMatch("/anecdote/:id");
  const anecdote = match ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id)) : null;

  const createAnecdote = (newAnecdote) => {
    setAnecdotes(anecdotes.concat({ ...newAnecdote, id: anecdotes.length + 1, vote: 0 }));
    setNotification({ message: `a new ${newAnecdote.content} is created!`, type: "success" });
  };

  const padding = {
    padding: 5,
  };

  return (
    <div>
      <h1>Software Anecdotes</h1>
      <div>
        <Link style={padding} to="/">
          anecdotes
        </Link>
        <Link style={padding} to="/create">
          create new
        </Link>
        <Link style={padding} to="/about">
          about
        </Link>
      </div>
      {notification.message && <Notification notification={notification} setNotification={setNotification} />}
      <Routes>
        <Route path="/anecdote/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route path="/create" element={<CreateAnecdote onCreate={createAnecdote} />} />
        <Route path="/" element={<Anecdotes anecdotes={anecdotes} />} />
      </Routes>
      <div>
        <br />
        <em>
          Anecdote app for Full Stack - Nabin Kaucha. See{" "}
          <a href="https://github.com/uzumakiNabin/FSOpen/tree/main/part7/routed_anecdotes">
            https://github.com/uzumakiNabin/FSOpen/tree/main/part7/routed_anecdotes
          </a>{" "}
          for source code.
        </em>
      </div>
    </div>
  );
};

export default App;
