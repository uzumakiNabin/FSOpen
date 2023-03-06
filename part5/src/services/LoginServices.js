import axios from "axios";

const baseUrl = "http://localhost:3001/api/login";

const login = async (loginCredential) => {
  try {
    const response = await axios.post(baseUrl, loginCredential);
    return response.data;
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export { login };
