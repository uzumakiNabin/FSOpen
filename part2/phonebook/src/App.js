import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import Form from "./components/Form";
import PersonsList from "./components/PersonsList";
import { getAll, create, update, deleteOne } from "./services/PhonebookServices";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    getAll().then((responseData) => setPersons(responseData));
  }, []);

  const getFilteredPersons = () => {
    return persons.filter((person) => person.name?.toLowerCase().includes(filterText));
  };

  const handleAdd = (newPerson) => {
    let existingPerson = persons.find((person) => person.name.toLowerCase() === newPerson.name.toLowerCase());
    if (existingPerson) {
      if (window.confirm(`${newPerson.name} is already added to Phonebook, replace the old number with new one?`)) {
        update({ ...newPerson, id: existingPerson.id }).then((responseData) =>
          setPersons(persons.map((person) => (person.id === responseData.id ? responseData : person)))
        );
      }
    } else {
      create(newPerson).then((responseData) => setPersons(persons.concat(responseData)));
    }
  };

  const handleFilter = (filter) => {
    setFilterText(filter);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      deleteOne(id).then(() => setPersons(persons.filter((person) => person.id !== id)));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <Form handleAdd={handleAdd} />
      <h2>Numbers</h2>
      <PersonsList persons={getFilteredPersons()} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
