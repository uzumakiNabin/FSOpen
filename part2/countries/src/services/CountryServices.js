import axios from "axios";

const baseUrl = "https://restcountries.com/v3.1/name";
const ciocUrl = "https://restcountries.com/v3.1/alpha";

const searchByName = (searchText) => axios.get(`${baseUrl}/${searchText}`).then((response) => response.data);

const getByCIOC = (ciocId) => axios.get(`${ciocUrl}/${ciocId}`).then((response) => response.data);

export { searchByName, getByCIOC };
