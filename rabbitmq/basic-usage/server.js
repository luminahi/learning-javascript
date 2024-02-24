import { receiveMessages } from "./lib/receiver.js";

function main() {
    const args = process.argv.slice(2);

    const queue = args.length > 0 ? args[0] : "general";
    console.log("[x] reading messages from [%s]", queue);
    receiveMessages(queue);
}

main();
