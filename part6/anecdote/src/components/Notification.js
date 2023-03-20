import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { resetNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    let notificationTimer = setTimeout(() => {
      dispatch(resetNotification());
    }, notification.duration * 1000);
    return () => clearTimeout(notificationTimer);
  });

  return <>{notification.message ? <div className={`${notification.type} notif`}>{notification.message}</div> : ""}</>;
};

export default Notification;
