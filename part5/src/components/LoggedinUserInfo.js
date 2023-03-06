const LoggedinUserInfo = ({ user, logout }) => {
  return (
    <div>
      {user.name} logged in<button onClick={logout}>logout</button>
    </div>
  );
};

export default LoggedinUserInfo;
