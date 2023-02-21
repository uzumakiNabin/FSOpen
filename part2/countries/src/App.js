import { useState, useEffect } from "react";

import { searchByName, getByCIOC } from "./services/CountryServices";
import CountrySearchResults from "./components/CountrySearchResults";
import CountryInfo from "./components/CountryInfo";

const App = () => {
  const [countryInput, setCountryInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState({});
  const [showSingleCountryInfo, setShowSingleCountryInfo] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    searchByName(countryInput)
      .then((responseData) => {
        if (responseData.length > 1) {
          setCountries(responseData);
          setShowSingleCountryInfo(false);
        } else {
          setCountry(responseData[0]);
          setShowSingleCountryInfo(true);
        }
      })
      .catch((err) => console.log("error", err));
  };

  const showCountryInfo = (ciocId) => {
    getByCIOC(ciocId)
      .then((responseData) => {
        setCountry(responseData[0]);
        setShowSingleCountryInfo(true);
      })
      .catch((err) => console.log("error", err));
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label htmlFor="countryInput">find countries</label>
        <input id="countryInput" value={countryInput} onChange={(e) => setCountryInput(e.target.value)} />
        <button>Find</button>
      </form>
      {showSingleCountryInfo ? <CountryInfo country={country} /> : <CountrySearchResults countries={countries} showCountryInfo={showCountryInfo} />}
    </div>
  );
};

export default App;
