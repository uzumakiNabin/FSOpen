import { useEffect } from "react";

const Notification = ({ notification, setNotification }) => {
  useEffect(() => {
    const notificationTimeout = setTimeout(() => setNotification({ message: "", type: "" }), 5000);
    return () => clearTimeout(notificationTimeout);
  });

  return <>{notification.message ? <div className={`${notification.type} notif`}>{notification.message}</div> : ""}</>;
};

export default Notification;
