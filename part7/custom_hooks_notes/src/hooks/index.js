import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const reset = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    reset,
  };
};

export const useResource = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => setData(response.data))
      .catch(() => setData(null));
  }, []);

  const getAll = () => {
    const res = axios
      .get(url)
      .then((response) => response.data)
      .catch(() => null);
    return res;
  };

  const getById = (id) => {
    const res = axios
      .get(`${url}/${id}`)
      .then((response) => response.data)
      .catch(() => null);
    return res;
  };

  const deleteById = (id) => {
    const res = axios
      .delete(`${url}/${id}`)
      .then(() => {
        setData(data.filter((item) => item.id !== id));
        return true;
      })
      .catch(() => false);
    return res;
  };

  const addNew = (newItem) => {
    const res = axios
      .post(url, newItem)
      .then((response) => {
        setData(data.concat(response.data));
        return response.data;
      })
      .catch(() => null);
    return res;
  };

  const updateById = (updatedItem) => {
    const res = axios
      .put(`${url}/${updatedItem.id}`, updatedItem)
      .then((response) => {
        setData(data.map((entry) => (entry.id === updatedItem.id ? response.data : entry)));
        return response.data;
      })
      .catch(() => null);
    return res;
  };

  return [data, { getAll, getById, deleteById, addNew, updateById }];
};
