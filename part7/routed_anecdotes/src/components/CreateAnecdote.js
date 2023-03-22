import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onCreate }) => {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    onCreate({ content, author, url });
    setContent("");
    setAuthor("");
    setUrl("");
    navigate("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="content">Content:</label>
          <input value={content} onChange={(e) => setContent(e.target.value)} id="content" required />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} id="author" required />
        </div>
        <div>
          <label htmlFor="url">Url:</label>
          <input value={url} onChange={(e) => setUrl(e.target.value)} id="url" required />
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

export default Login;
