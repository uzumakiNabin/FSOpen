import { useState } from "react";

const LoginForm = ({ handleLogin }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ username, password });
    setUserName("");
    setPassword("");
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="username">Username: </label>
          <input id="username" value={username} onChange={(e) => setUserName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <button className="btn btn-add" type="submit">
            login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
