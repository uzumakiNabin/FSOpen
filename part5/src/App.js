import { useState, useEffect } from "react";

import { login } from "./services/LoginServices";
import { getAllBlogs, createBlog, setToken } from "./services/BlogServices";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import LoggedinUserInfo from "./components/LoggedinUserInfo";
import Blog from "./components/Blog";
import NewBlogForm from "./components/NewBlogForm";

const App = () => {
  const [user, setUser] = useState({});
  const [notificationMessage, setNotificationMessage] = useState({ type: "", text: "" });
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      const user = JSON.parse(userFromLocalStorage);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (user.token) {
      getAllBlogs()
        .then((responseData) => {
          setBlogs(responseData);
        })
        .catch((err) => handleNotification("error", err.response.data ? err.response.data.error : "cannot fetch blogs now, please try again later"));
    }
  }, [user]);

  const handleLogin = async (loginCredentials) => {
    try {
      const responseData = await login(loginCredentials);
      setUser(responseData);
      setToken(responseData.token);
      localStorage.setItem("user", JSON.stringify(responseData));
    } catch (err) {
      handleNotification("error", err.response.data ? err.response.data.error : "cannot login now, please try again later");
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

  const handleAddBlog = (newBlog) => {
    createBlog(newBlog)
      .then((responseData) => {
        handleNotification("success", `a new blog ${responseData.title} added`);
        setBlogs(blogs.concat(responseData));
      })
      .catch((err) => {
        handleNotification("error", err.response.data ? err.response.data.error : "cannot add blog now, please try again later");
      });
  };

  return (
    <div>
      <Notification message={notificationMessage} />
      {user.username ? (
        <div>
          <h2>Blogs</h2>
          <LoggedinUserInfo user={user} logout={logout} />
          <NewBlogForm handleAddBlog={handleAddBlog} />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <LoginForm handleLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
