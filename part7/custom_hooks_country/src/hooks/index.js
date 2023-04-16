import { useState, useEffect } from "react";
import axios from "axios";

export const useCountry = () => {
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (country) {
      setIsLoading(true);
      axios
        .get(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
        .then((response) => {
          setIsLoading(false);
          setIsSuccess(true);
          setData(response.data[0]);
          setError("");
        })
        .catch((err) => {
          setIsLoading(false);
          setIsSuccess(false);
          setData(null);
          setError(err.response.status === 404 ? "not found ..." : "error fetching country info");
        });
    }
  }, [country]);

  return {
    data,
    error,
    isLoading,
    isSuccess,
    setCountry,
  };
};
