import AnecdoteList from "./components/AnecdoteList";
import NewAnecdoteForm from "./components/NewAnecdoteForm";
import AnecdoteFilter from "./components/AnecdoteFilter";

const App = () => {
  return (
    <div>
      <h1>Anecdotes</h1>
      <AnecdoteFilter />
      <AnecdoteList />
      <NewAnecdoteForm />
    </div>
  );
};

export default App;
