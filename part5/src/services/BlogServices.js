import axios from "axios";

const baseUrl = "http://localhost:3001/api/blogs";
let token = "";

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAllBlogs = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (ex) {
    return Promise.reject(ex);
  }
};

const createBlog = async (newBlog) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.post(baseUrl, newBlog, config);
    return response.data;
  } catch (ex) {
    return Promise.reject(ex);
  }
};

const updateBlog = async (updateBlog) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.put(`${baseUrl}/${updateBlog.id}`, updateBlog, config);
    return response.data;
  } catch (ex) {
    return Promise.reject(ex);
  }
};

const deleteOneBlog = async (id) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    await axios.delete(`${baseUrl}/${id}`, config);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export { getAllBlogs, createBlog, updateBlog, deleteOneBlog, setToken };
