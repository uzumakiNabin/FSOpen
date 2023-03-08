import { useState, useEffect } from "react";

import { login } from "./services/LoginServices";
import { getAllBlogs, createBlog, updateBlog, deleteOneBlog, setToken } from "./services/BlogServices";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import LoggedinUserInfo from "./components/LoggedinUserInfo";
import Blog from "./components/Blog";
import NewBlogForm from "./components/NewBlogForm";

const App = () => {
  const [user, setUser] = useState({});
  const [notificationMessage, setNotificationMessage] = useState({ type: "", text: "" });
  const [blogs, setBlogs] = useState([]);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showNewBlogForm, setShowNewBlogForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userFromLocalStorage = localStorage.getItem("user");
      if (userFromLocalStorage) {
        const user = JSON.parse(userFromLocalStorage);
        setUser(user);
        setToken(user.token);
      }
      try {
        const responseData = await getAllBlogs();
        setBlogs(responseData);
      } catch (err) {
        handleNotification("error", err.response?.data ? err.response.data.error : "cannot fetch blogs now, please try again later");
      }
    };

    fetchData();
  }, []);

  const handleLogin = async (loginCredentials) => {
    try {
      const responseData = await login(loginCredentials);
      setUser(responseData);
      setToken(responseData.token);
      localStorage.setItem("user", JSON.stringify(responseData));
    } catch (err) {
      handleNotification("error", err.response?.data ? err.response.data.error : "cannot login now, please try again later");
    }
  };

  const handleNotification = (type, text) => {
    setNotificationMessage({ type, text });
    setTimeout(() => {
      setNotificationMessage({ type: "", text: "" });
    }, 3000);
  };

  const logout = () => {
    setUser({});
    localStorage.removeItem("user");
  };

  const handleAddBlog = async (newBlog) => {
    try {
      const responseData = await createBlog(newBlog);
      handleNotification("success", `a new blog ${responseData.title} added`);
      setBlogs(blogs.concat(responseData));
    } catch (err) {
      handleNotification("error", err.response?.data ? err.response.data.error : "cannot add blog now, please try again later");
    }
  };

  const handleUpdateBlog = async (blogToUpdate) => {
    blogToUpdate.user = blogToUpdate.user.id;
    try {
      const responseData = await updateBlog(blogToUpdate);
      handleNotification("success", `a blog ${responseData.title} updated`);
      setBlogs(
        blogs.map((blog) => {
          if (blog.id === responseData.id) {
            return responseData;
          } else {
            return blog;
          }
        })
      );
    } catch (err) {
      handleNotification("error", err.response?.data ? err.response.data.error : "cannot update blog now, please try again later");
    }
  };

  const handleLike = async (blogToLike) => {
    blogToLike = { ...blogToLike, likes: blogToLike.likes + 1 };
    await handleUpdateBlog(blogToLike);
  };

  const handleDelete = async (blogToDelete) => {
    try {
      if (window.confirm(`Remove blog ${blogToDelete.title}?`)) {
        await deleteOneBlog(blogToDelete.id);
        handleNotification("success", `a blog ${blogToDelete.title} deleted`);
        setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id));
      }
    } catch (err) {
      handleNotification("error", err.response?.data ? err.response.data.error : "cannot delete blog now, please try again later");
    }
  };

  return (
    <div>
      <Notification message={notificationMessage} />
      {user.username ? (
        <div>
          <h2>Blogs</h2>
          <LoggedinUserInfo user={user} logout={logout} />
          {showNewBlogForm && <NewBlogForm handleAddBlog={handleAddBlog} />}
          <button
            className="btn-small"
            onClick={() => {
              setShowNewBlogForm(!showNewBlogForm);
            }}
          >
            {showNewBlogForm ? "cancel" : "create new blog"}
          </button>
        </div>
      ) : (
        <>
          {showLoginForm && <LoginForm handleLogin={handleLogin} />}
          <button
            className="btn-small"
            onClick={() => {
              setShowLoginForm(!showLoginForm);
            }}
          >
            {showLoginForm ? "cancel" : "login"}
          </button>
        </>
      )}
      {blogs
        .sort((first, second) => second.likes - first.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} handleDelete={handleDelete} />
        ))}
    </div>
  );
};

export default App;
