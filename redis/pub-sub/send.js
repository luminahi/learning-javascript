import redis from "redis";

async function sendMessage() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.log("provide at least one argument");
        process.exit(0);
    }

    const client = await redis
        .createClient({ url: "redis://localhost" })
        .on("error", (err) => console.log(err))
        .connect();

    const channel = args[0];
    const message = args.length > 1 ? args.slice(1).join(" ") : "empty";

    const condition = await client.publish(channel, message);

    await client.disconnect();
}

sendMessage();
