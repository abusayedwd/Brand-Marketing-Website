import { io } from "socket.io-client";

const socketUrl =
  process.env.NEXT_PUBLIC_SOCKET_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3050";

const socket = io(socketUrl, {
  autoConnect: false,
  transports: ["websocket", "polling"],
});

export default socket;
