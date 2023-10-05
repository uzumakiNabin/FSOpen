import { gql } from "@apollo/client";

export const GET_ALL = gql`
  query getAll($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      id
      title
      author {
        name
      }
      published
      genres
    }
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      id
      title
      author {
        name
      }
      published
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      id
      name
      born
      bookCount
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const GET_USER = gql`
  query getUser {
    me {
      username
      favoriteGenre
      id
    }
  }
`;
