import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
    console.log("connected");
    console.log(socket.id);

    socket.emit("message", "hello", Math.random() * 100);

    socket.disconnect();
});
