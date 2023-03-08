import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className="blog">
      {blog.title}
      <button className="btn-small btn-inline" onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "hide" : "view"}
      </button>
      {showDetails && (
        <>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            Likes {blog.likes}
            <button className="btn-small btn-inline" onClick={() => handleLike(blog)}>
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username && (
            <div>
              <button className="btn-small btn-delete" onClick={() => handleDelete(blog)}>
                remove
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Blog;
