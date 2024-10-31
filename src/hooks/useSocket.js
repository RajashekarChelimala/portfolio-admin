import { useEffect } from "react";
import { io } from "socket.io-client";

const useSocket = (eventType, callback) => {
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const socket = io(process.env.REACT_APP_BACKEND_URL, {
      auth: {
        token: token,
      },
    });

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on(eventType, (data) => {
      callback(data);  // Call the callback with the incoming data
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [eventType, callback]);
};

export default useSocket;
