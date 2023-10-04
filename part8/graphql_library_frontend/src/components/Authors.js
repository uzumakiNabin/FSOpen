import { useState } from "react";

const Authors = ({ show, authors, editAuthor }) => {
  const [author, setAuthor] = useState({ name: authors[0]?.name, born: "" });
  if (!show) {
    return null;
  }

  const submit = (e) => {
    e.preventDefault();

    editAuthor({ variables: { name: author.name, setBornTo: +author.born } });
    setAuthor({ name: authors[0]?.name, born: "" });
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Update Author</h2>
        <form onSubmit={submit}>
          <label>
            name
            <select value={author.name} onChange={(e) => setAuthor({ ...author, name: e.target.value })}>
              {authors.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            born on
            <input type="number" value={author.born} onChange={(e) => setAuthor({ ...author, born: e.target.value })} required />
          </label>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
