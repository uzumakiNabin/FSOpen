import axios from "axios";
const baseUrl = "http://localhost:3001";

const getAnecdotesFromServer = async () => {
  try {
    const response = await axios.get(`${baseUrl}/anecdotes`);
    return response.data;
  } catch (ex) {
    return Promise.reject(ex);
  }
};

const createAnecdoteInServer = async (anecdoteContent) => {
  try {
    const response = await axios.post(`${baseUrl}/anecdotes`, { content: anecdoteContent, vote: 0 });
    return response.data;
  } catch (ex) {
    return Promise.reject(ex);
  }
};

const voteAnecdoteInServer = async (anecdoteToVote) => {
  try {
    const response = await axios.put(`${baseUrl}/anecdotes/${anecdoteToVote.id}`, { ...anecdoteToVote, vote: anecdoteToVote.vote + 1 });
    return response.data;
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export { getAnecdotesFromServer, createAnecdoteInServer, voteAnecdoteInServer };
