import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
// preferred way to import (from `v4`). Uses `animate__` prefix.
import 'animate.css/animate.min.css';
// Alternate way to use classes without prefix like `animated fadeIn`
import 'animate.css/animate.compat.css'

const Notification = (title,message,type) => {
  Store.addNotification({
    title,
    message,
    type,
    insert: "top",
    container: "top-left",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 2000,
      onScreen: true,
      pauseOnHover:true
    }
  });
}

export default Notification