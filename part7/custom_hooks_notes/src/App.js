import { useField, useResource } from "./hooks";

const App = () => {
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetName, ...name } = useField("text");
  const { reset: resetNumber, ...number } = useField("number");
  const [notes, noteService] = useResource("http://localhost:3001/notes");
  const [persons, personService] = useResource("http://localhost:3001/persons");

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    noteService.addNew({ content: content.value });
    resetContent();
  };

  const handlePersonSubmit = (e) => {
    e.preventDefault();
    personService.addNew({ name: name.value, number: number.value });
    resetName();
    resetNumber();
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <div>
          <button className="btn btn-add">create</button>
        </div>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        <label htmlFor="name">name</label> <input id="name" {...name} /> <br />
        <label htmlFor="number">number</label> <input id="number" {...number} />
        <div>
          <button className="btn btn-add">create</button>
        </div>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
