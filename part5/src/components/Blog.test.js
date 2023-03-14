import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("title is rendered but other info is not", () => {
  const blog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  };
  const user = { name: "test", username: "testuser" };
  const handleLike = jest.fn();
  const handleDelete = jest.fn();

  render(<Blog blog={blog} user={user} handleLike={handleLike} handleDelete={handleDelete} />);

  const element = screen.getByText("React patterns");
  expect(element).toBeDefined();

  let authorElement = screen.queryByText("Michael Chan");
  expect(authorElement).not.toBeInTheDocument();

  let urlElement = screen.queryByText("https://reactpatterns.com/");
  expect(urlElement).not.toBeInTheDocument();

  let likesElement = screen.queryByText("Likes 7");
  expect(likesElement).not.toBeInTheDocument();
});

test("clicking 'view' will render all info", async () => {
  const user = { name: "test", username: "testuser" };
  const blog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user,
  };
  const handleLike = jest.fn();
  const handleDelete = jest.fn();

  render(<Blog blog={blog} user={user} handleLike={handleLike} handleDelete={handleDelete} />);

  const usr = userEvent.setup();
  const showButton = screen.getByText("view");
  await usr.click(showButton);

  let urlElement = screen.getByText("https://reactpatterns.com/");
  expect(urlElement).toBeDefined();

  let likesElement = screen.getByText("Likes 7");
  expect(likesElement).toBeDefined();

  let userNameElement = screen.getByText("test");
  expect(userNameElement).toBeDefined();
});

test("clicking 'like' twice will call likeHandler function from props twice", async () => {
  const user = { name: "test", username: "testuser" };
  const blog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user,
  };
  const handleLike = jest.fn();
  const handleDelete = jest.fn();

  render(<Blog blog={blog} user={user} handleLike={handleLike} handleDelete={handleDelete} />);

  const usr = userEvent.setup();
  const showButton = screen.getByText("view");
  await usr.click(showButton);

  const likeButton = screen.getByRole("button", { name: "like" });
  await usr.click(likeButton);
  await usr.click(likeButton);
  expect(handleLike.mock.calls).toHaveLength(2);
});
