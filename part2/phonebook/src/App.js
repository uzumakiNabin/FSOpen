import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import Form from "./components/Form";
import PersonsList from "./components/PersonsList";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data))
      .catch((err) => console.log("error fetching", err));
  }, []);

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
