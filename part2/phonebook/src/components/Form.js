import { useState } from "react";

const Form = ({ handleAdd }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd({ name: newName, number: newNumber });
    setNewName("");
    setNewNumber("");
  };
  return (
    <div>
      <h2>Add New</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} required />
        </div>
        <div>
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
