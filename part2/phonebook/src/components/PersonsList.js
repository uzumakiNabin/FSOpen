const PersonsList = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.length > 0 ? (
        <table>
          <tbody>
            {persons.map((person) => (
              <tr key={person.id}>
                <td style={{ padding: "0px 5px", textAlign: "left" }}>{person.name}</td>
                <td style={{ padding: "0px 5px", textAlign: "right", fontFamily: "consolas" }}>{person.number}</td>
                <td>
                  <button className="btn-delete" onClick={() => handleDelete(person.id, person.name)}>
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "..."
      )}
    </div>
  );
};

export default PersonsList;
