const PersonsList = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.length > 0 ? (
        <>
          {persons.map((person) => (
            <p key={person.id}>
              {person.name} {person.number}
              <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
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
