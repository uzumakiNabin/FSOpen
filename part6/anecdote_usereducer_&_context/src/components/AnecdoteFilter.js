const AnecdoteFilter = ({ filter, setFilter }) => {
  return (
    <>
      <label htmlFor="filterinput">filter:</label>
      <input id="filterinput" value={filter} onChange={(e) => setFilter(e.target.value)} />
    </>
  );
};

export default AnecdoteFilter;
