import { createConnection } from "net";
import { exit } from "process";
import { createInterface } from "readline";

const socketPath = "custom.socket";

const q1 = createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestion(clientConnection) {
    q1.question("Write something: ", (answer) => {
        clientConnection.write(answer);
    });
}

const client = createConnection({ path: socketPath }, () => {
    console.log("connected to unix socket: ", socketPath);

    client.on("close", () => {
        console.log("connection ended");
        exit(0);
    });

    client.on("ready", () => {
        askQuestion(client);
    });

    client.on("data", (data) => {
        let text = data.toString("utf-8").replace("\n", "");
        console.log(`server answer: ${text}`);
        askQuestion(client);
    });
});
