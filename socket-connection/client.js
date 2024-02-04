import { createConnection } from "net";
import { exit } from "process";
import { createInterface } from "readline";

const socketPath = "custom.socket";
const pid = process.pid;

const q1 = createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestion(clientConnection) {
    q1.question("Write something: ", (answer) => {
        clientConnection.write(pid + "@" + answer);
    });
}

const client = createConnection({ path: socketPath }, () => {
    console.log("connected to unix socket: ", socketPath);

    client.on("ready", () => {
        client.write(pid + "@" + "[connected]");
    });

    client.on("data", (data) => {
        // let text = data.toString("utf-8").replace("\n", "");
        // console.log(`server answer: ${text}`);
        askQuestion(client);
    });

    client.on("close", () => {
        console.log("server stopped");
        exit(0);
    });
});
