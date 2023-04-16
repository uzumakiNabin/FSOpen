const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name.official}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <b>Languages:</b>
      <ul>
        {Object.keys(country.languages).map((lang) => (
          <li key={lang}>{country.languages[lang]}</li>
        ))}
      </ul>
      <img src={country.flags.svg} style={{ width: "200px", height: "auto" }} />
    </div>
  );
};

export default CountryInfo;
