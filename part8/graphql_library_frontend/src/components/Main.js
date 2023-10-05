import { useState } from "react";
import { useMutation, useApolloClient, useQuery } from "@apollo/client";
import Authors from "./Authors";
import Books from "./Books";
import NewBook from "./NewBook";
import Login from "./Login";
import Recommendations from "./Recommendations";
import { GET_ALL, ADD_BOOK, EDIT_AUTHOR, LOGIN } from "../graphQueries";

export default function Main() {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(localStorage.getItem("library-app-token") ?? "");
  const [error, setError] = useState("");

  const client = useApolloClient();

  const displayError = (error) => {
    let errorText = error.message + "\n";
    error.graphQLErrors.forEach((e) => errorText + e.message + "\n");
    let timer;
    setError(errorText);
    clearTimeout(timer);
    timer = setTimeout(() => {
      setError("");
    }, 4000);
  };

  const { data, loading } = useQuery(GET_ALL);
  const [addBook] = useMutation(ADD_BOOK, { refetchQueries: [{ query: GET_ALL }], onError: (error) => displayError(error) });
  const [editAuthor] = useMutation(EDIT_AUTHOR, { refetchQueries: [{ query: GET_ALL }], onError: (error) => displayError(error) });
  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      setToken(data.login.value);
      localStorage.setItem("library-app-token", data.login.value);
      setPage("authors");
    },
    onError: (error) => displayError(error),
  });

  const logout = () => {
    setToken("");
    localStorage.removeItem("library-app-token");
    client.clearStore();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("recomend")}>recommedations</button>}
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      {page === "authors" && <Authors authors={data?.allAuthors ?? []} editAuthor={editAuthor} />}

      {page === "books" && <Books books={data?.allBooks ?? []} />}

      {page === "add" && <NewBook addBook={addBook} />}

      {page === "login" && <Login login={login} />}

      {page === "recomend" && <Recommendations />}
    </div>
  );
}
