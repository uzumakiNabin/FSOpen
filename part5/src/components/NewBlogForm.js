import { useState } from "react";

const NewBlogForm = ({ handleAddBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="title">Title: </label>
          <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="url">Url: </label>
          <input id="url" value={url} onChange={(e) => setUrl(e.target.value)} required />
        </div>
        <div>
          <button className="btn btn-add" type="submit">
            create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewBlogForm;
