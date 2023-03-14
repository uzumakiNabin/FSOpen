import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewBlogForm from "./NewBlogForm";

test("submitting new blog form will call handleAddBlog from props with correct details", async () => {
  const handleAddBlog = jest.fn();

  render(<NewBlogForm handleAddBlog={handleAddBlog} />);

  const usr = userEvent.setup();

  const titleInput = screen.getByLabelText(/title/i);
  const authorInput = screen.getByLabelText(/author/i);
  const urlInput = screen.getByLabelText(/url/i);
  const submitButton = screen.getByRole("button", { name: "create" });

  await usr.type(titleInput, "testtitle");
  await usr.type(authorInput, "testauthor");
  await usr.type(urlInput, "http://www.test.com/");
  await usr.click(submitButton);

  expect(handleAddBlog.mock.calls).toHaveLength(1);
  expect(handleAddBlog.mock.calls[0][0]).toEqual({ title: "testtitle", author: "testauthor", url: "http://www.test.com/" });
});
