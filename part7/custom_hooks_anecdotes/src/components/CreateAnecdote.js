import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const Login = ({ onCreate }) => {
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetUrl, ...url } = useField("text");
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    onCreate({ content: content.value, author: author.value, url: url.value });
    resetContent();
    resetAuthor();
    resetUrl();
    navigate("/");
  };

  const onReset = (e) => {
    e.preventDefault();
    resetContent();
    resetAuthor();
    resetUrl();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={onSubmit} onReset={onReset}>
        <div>
          <label htmlFor="content">Content:</label>
          <input {...content} id="content" required />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input {...author} id="author" required />
        </div>
        <div>
          <label htmlFor="url">Url:</label>
          <input {...url} id="url" required />
        </div>
        <div>
          <button className="btn btn-add" type="submit">
            create
          </button>
          <button className="btn" type="reset">
            reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
