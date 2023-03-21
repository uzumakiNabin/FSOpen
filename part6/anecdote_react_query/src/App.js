import AnecdoteList from "./components/AnecdoteList";
import NewAnecdoteForm from "./components/NewAnecdoteForm";

const App = () => {
  return (
    <div>
      <h1>Anecdotes</h1>
      <AnecdoteList />
      <NewAnecdoteForm />
    </div>
  );
};

export default App;
