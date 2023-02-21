const Notification = ({ message }) => {
  return <>{message.text ? <div className={`${message.type} notif`}>{message.text}</div> : ""}</>;
};

export default Notification;
