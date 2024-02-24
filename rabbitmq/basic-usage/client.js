import { sendMessage } from "./lib/sender.js";

function main() {
    const args = process.argv.slice(2);

    if (args.length < 1) {
        console.log("provide at least one argument");
        return;
    }

    const queue = args[0];
    const message = args.length > 1 ? args.slice(1).join(" ") : "default";

    sendMessage(queue, message);
}

main();
