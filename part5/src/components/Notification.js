import PropTypes from "prop-types";

const Notification = ({ message }) => {
  return <>{message.text ? <div className={`${message.type} notif`}>{message.text}</div> : ""}</>;
};

Notification.propTypes = {
  message: PropTypes.object.isRequired,
};

export default Notification;
