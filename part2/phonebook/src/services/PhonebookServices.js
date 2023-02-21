import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const create = (newPerson) => axios.post(baseUrl, newPerson).then((response) => response.data);

const update = (updatePerson) => axios.put(`${baseUrl}/${updatePerson.id}`, updatePerson).then((response) => response.data);

const deleteOne = (id) => axios.delete(`${baseUrl}/${id}`);

export { getAll, create, update, deleteOne };
