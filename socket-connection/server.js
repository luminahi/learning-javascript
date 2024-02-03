import { createServer } from "net";
import { existsSync, unlinkSync } from "fs";
import { exit } from "process";

const socketPath = "custom.socket";

if (existsSync(socketPath)) {
    console.log("deleting existing socket...");
    unlinkSync(socketPath);
}

const server = createServer((socket) => {
    socket.on("connect", () => {
        console.log("client connected");
    });

    socket.on("data", (data) => {
        console.log("data received: ", data.toString());
        socket.write("ok!");
    });

    socket.on("end", () => {
        console.log("connection ended");
    });
});

server.listen(socketPath, () => {
    console.log("server listening on unix socket: ", socketPath);
});
