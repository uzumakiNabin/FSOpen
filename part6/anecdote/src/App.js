import AnecdoteList from "./components/AnecdoteList";
import NewAnecdoteForm from "./components/NewAnecdoteForm";
import AnecdoteFilter from "./components/AnecdoteFilter";
import Notification from "./components/Notification";

const App = () => {
  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <AnecdoteFilter />
      <AnecdoteList />
      <NewAnecdoteForm />
    </div>
  );
};

export default App;
