import { useMemo, useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL } from "../graphQueries";

const Books = ({ books }) => {
  const [booksByGenre, setBooksByGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [getAll, { loading }] = useLazyQuery(GET_ALL, {
    onCompleted: (data) => {
      setBooksByGenre(data.allBooks);
    },
  });

  const allGenres = useMemo(() => Array.from(new Set(books.map((b) => b.genres).flat(1))), [books]);

  const getByGenre = (genre) => {
    setSelectedGenre(genre);
    getAll({ variables: { genre } });
  };

  useEffect(() => {
    return () => {
      setSelectedGenre("");
    };
  }, []);

  if (loading) {
    return <div>Loading books...</div>;
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {(selectedGenre ? booksByGenre : books).map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author?.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {allGenres.map((g, i) => (
          <button key={i} onClick={() => getByGenre(g)} disabled={g === selectedGenre}>
            {g}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
