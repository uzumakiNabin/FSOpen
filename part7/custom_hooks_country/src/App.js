import { useState } from "react";

import CountryInfo from "./components/CountryInfo";
import { useCountry } from "./hooks";

const App = () => {
  const [countryInput, setCountryInput] = useState("");

  const country = useCountry();

  const handleSearch = (e) => {
    e.preventDefault();
    country.setCountry(countryInput);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label htmlFor="countryInput">find countries</label>
        <input id="countryInput" value={countryInput} onChange={(e) => setCountryInput(e.target.value)} />
        <button className="btn btn-other" type="submit">
          Find
        </button>
      </form>
      {country.isLoading && <span>Loading...</span>}
      {!country.isSuccess && <span>{country.error}</span>}
      {country.isSuccess && !country.isLoading && <CountryInfo country={country.data} />}
    </div>
  );
};

export default App;
