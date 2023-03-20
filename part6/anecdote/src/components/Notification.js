import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { resetNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const notificaton = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    let notificationTimer = setTimeout(() => {
      dispatch(resetNotification());
    }, 5000);
    return () => clearTimeout(notificationTimer);
  });

  return <>{notificaton.message ? <div className={`${notificaton.type} notif`}>{notificaton.message}</div> : ""}</>;
};

export default Notification;
