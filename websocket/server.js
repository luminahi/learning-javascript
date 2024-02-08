import { Server } from "socket.io";

const socket = new Server(3000, { cors: { origin: "*" } });

socket.on("connection", (socket) => {
    console.log(`connected with id ${socket.id}`);

    socket.on("message", (data, secret) => {
        console.log(data, secret);
    });
});
