import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = () =>
  axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch((ex) => Promise.reject(ex));

const createOne = async (anecdoteContent) => {
  if (anecdoteContent.length < 5) {
    return Promise.reject(Error("anecdote too short, should be 5 characters or more"));
  } else {
    return axios
      .post(baseUrl, { content: anecdoteContent, vote: 0 })
      .then((response) => response.data)
      .catch((ex) => Promise.reject(ex));
  }
};

const voteOne = async (anecdoteToVote) =>
  axios
    .put(`${baseUrl}/${anecdoteToVote.id}`, { ...anecdoteToVote, vote: anecdoteToVote.vote + 1 })
    .then((response) => response.data)
    .catch((ex) => Promise.reject(ex));

export { getAll, createOne, voteOne };
