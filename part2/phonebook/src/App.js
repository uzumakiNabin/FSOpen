import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import Form from "./components/Form";
import PersonsList from "./components/PersonsList";
import Notification from "./components/Notification";
import { getAll, create, update, deleteOne } from "./services/PhonebookServices";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [notificationMessage, setNotificationMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    getAll()
      .then((responseData) => setPersons(responseData))
      .catch((err) => {
        handleNotification("error", "Cannot load data, please try again later.");
      });
  }, []);

  const getFilteredPersons = () => {
    return persons.filter((person) => person.name?.toLowerCase().includes(filterText));
  };

  const handleAdd = (newPerson) => {
    let existingPerson = persons.find((person) => person.name.toLowerCase() === newPerson.name.toLowerCase());
    if (existingPerson) {
      if (window.confirm(`${newPerson.name} is already added to Phonebook, replace the old number with new one?`)) {
        update({ ...newPerson, id: existingPerson.id })
          .then((responseData) => {
            setPersons(persons.map((person) => (person.id === responseData.id ? responseData : person)));
            handleNotification("success", `${responseData.name} updated successfully`);
          })
          .catch((err) => handleNotification("error", "Error occured while updating. Please try again later."));
      }
    } else {
      create(newPerson)
        .then((responseData) => {
          handleNotification("success", `${responseData.name} added successfully`);
          setPersons(persons.concat(responseData));
        })
        .catch((err) => handleNotification("error", "Error occured while creating. Please try again later."));
    }
  };

  const handleFilter = (filter) => {
    setFilterText(filter);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      deleteOne(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          handleNotification("success", `${name} deleted successfully`);
        })
        .catch((err) => {
          if (err.response) {
            let errorCode = err.response.status;
            switch (errorCode) {
              case 404:
                handleNotification("error", `Information of ${name} has already been removed from server`);
                break;
              default:
                handleNotification("error", err.response.statusText);
            }
          } else {
            handleNotification("error", "Error occured while deleting. Please try again later.");
          }
        });
    }
  };

  const handleNotification = (type, text) => {
    setNotificationMessage({ type, text });
    setTimeout(() => {
      setNotificationMessage({ type: "", text: "" });
    }, 3000);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} />
      <Filter handleFilter={handleFilter} />
      <Form handleAdd={handleAdd} />
      <h2>Numbers</h2>
      <PersonsList persons={getFilteredPersons()} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
