import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import Form from "./components/Form";
import PersonsList from "./components/PersonsList";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filterText, setFilterText] = useState("");

  const getFilteredPersons = () => {
    return persons.filter((person) => person.name.toLowerCase().includes(filterText));
  };

  const handleAdd = (newPerson) => {
    if (persons.findIndex((person) => person.name.toLowerCase() === newPerson.name.toLowerCase()) > -1) {
      alert(`${newPerson.name} is already added to Phonebook.`);
      return;
    }
    setPersons(persons.concat({ ...newPerson, id: persons.length + 1 }));
  };

  const handleFilter = (filter) => {
    setFilterText(filter);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <Form handleAdd={handleAdd} />
      <h2>Numbers</h2>
      <PersonsList persons={getFilteredPersons()} />
    </div>
  );
};

export default App;
