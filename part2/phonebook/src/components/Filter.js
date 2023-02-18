import { useState } from "react";

const Filter = ({ handleFilter }) => {
  const [searchText, setSearchText] = useState("");
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    handleFilter(e.target.value);
  };
  return (
    <div>
      <label htmlFor="searchText">filter shown with</label>
      <input id="searchText" value={searchText} onChange={(e) => handleSearch(e)} />
    </div>
  );
};

export default Filter;
