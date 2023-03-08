import PropTypes from "prop-types";

const LoggedinUserInfo = ({ user, logout }) => {
  return (
    <div>
      {user.name} logged in
      <button className="btn-small btn-inline" onClick={logout}>
        logout
      </button>
    </div>
  );
};

LoggedinUserInfo.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export default LoggedinUserInfo;
