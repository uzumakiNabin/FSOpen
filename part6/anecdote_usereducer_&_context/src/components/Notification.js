import { useEffect, useContext } from "react";

import NotificationContext from "../contexts/NotificationContext";

const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);

  useEffect(() => {
    let notificationTimer = setTimeout(() => {
      notificationDispatch({ type: "RESET" });
    }, notification.duration * 1000);
    return () => clearTimeout(notificationTimer);
  });

  return <>{notification.message ? <div className={`${notification.type} notif`}>{notification.message}</div> : ""}</>;
};

export default Notification;
