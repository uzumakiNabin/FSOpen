import CountryInfo from "./CountryInfo";

const CountrySearchResults = ({ countries, showCountryInfo }) => {
  return (
    <div>
      {countries.length > 10 ? (
        "Too many matches, keep typing"
      ) : (
        <>
          {countries.map((country) => (
            <p key={country.cioc}>
              {country.name.common} <button onClick={() => showCountryInfo(country.cioc)}>Show</button>
            </p>
          ))}
        </>
      )}
    </div>
  );
};

export default CountrySearchResults;
