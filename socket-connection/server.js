import { createServer } from "net";
import { existsSync, unlinkSync } from "fs";

const socketPath = "custom.socket";

if (existsSync(socketPath)) {
    console.log("deleting existing socket...");
    unlinkSync(socketPath);
}

const server = createServer((socket) => {
    socket.on("data", (data) => {
        let dataParts = data.toString().split("@", 2);
        if (dataParts[1] === "exit") {
            console.log(`[${dataParts[0]}]: `, "[disconnected]");
            socket.destroy();
        } else {
            console.log(`[${dataParts[0]}]: `, dataParts[1]);
            socket.write("ok");
        }
    });

    socket.on("end", () => {
        console.log("client disconnected");
    });
});

server.listen(socketPath, () => {
    console.log("server listening on unix socket: ", socketPath);
});
