import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = () =>
  axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch((ex) => Promise.reject(ex.message));

const createOne = async (anecdoteContent) =>
  axios
    .post(baseUrl, { content: anecdoteContent, vote: 0 })
    .then((response) => response.data)
    .catch((ex) => Promise.reject(ex.message));

const voteOne = async (anecdoteToVote) =>
  axios
    .put(`${baseUrl}/${anecdoteToVote.id}`, { ...anecdoteToVote, vote: anecdoteToVote.vote + 1 })
    .then((response) => response.data)
    .catch((ex) => Promise.reject(ex.message));

export { getAll, createOne, voteOne };
