const PersonsList = ({ persons }) => {
  return (
    <div>
      {persons.length > 0 ? (
        <>
          {persons.map((person) => (
            <p key={person.id}>
              {person.name} {person.number}
            </p>
          ))}
        </>
      ) : (
        "..."
      )}
    </div>
  );
};

export default PersonsList;
