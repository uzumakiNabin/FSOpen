import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Authors from "./Authors";
import Books from "./Books";
import NewBook from "./NewBook";
import { GET_ALL, ADD_BOOK, EDIT_AUTHOR } from "../graphQueries";

export default function Main() {
  const [page, setPage] = useState("authors");
  const { data, loading } = useQuery(GET_ALL);
  const [addBook] = useMutation(ADD_BOOK, { refetchQueries: [{ query: GET_ALL }] });
  const [editAuthor] = useMutation(EDIT_AUTHOR, { refetchQueries: [{ query: GET_ALL }] });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors show={page === "authors"} authors={data.allAuthors} editAuthor={editAuthor} />

      <Books show={page === "books"} books={data.allBooks} />

      <NewBook show={page === "add"} addBook={addBook} />
    </div>
  );
}
