import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () =>
  axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch((err) => window.alert("Error fetching"));

const create = (newPerson) =>
  axios
    .post(baseUrl, newPerson)
    .then((response) => response.data)
    .catch((err) => window.alert("Error creating"));

const update = (updatePerson) =>
  axios
    .put(`${baseUrl}/${updatePerson.id}`, updatePerson)
    .then((response) => response.data)
    .catch((err) => window.alert("Error updating"));

const deleteOne = (id) => axios.delete(`${baseUrl}/${id}`).catch((err) => window.alert("Error deleting"));

export { getAll, create, update, deleteOne };
