import { useState } from "react";

export default function Login({ login }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await login({ variables: { username, password } });
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username
          <input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  );
}
