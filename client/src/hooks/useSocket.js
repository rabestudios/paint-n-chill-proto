import socketIOClient from "socket.io-client";

let socket; // global var

const useSocket = (endpoint, data) => {
  if (!socket) {
    let options;
    if (data) {
      const queryStr = Object.keys(data)
        .map((key) => {
          const value = data[key];
          return `${key}=${value}`;
        })
        .join("&");
      options = { query: queryStr };
    }
    socket = socketIOClient(endpoint, options);
  }

  return socket;
};

export default useSocket;
