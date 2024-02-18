import redis from "redis";

async function startReceiver() {
    const channels = process.argv.slice(2);

    if (channels.length === 0) {
        console.log("provide at least one argument");
        process.exit(0);
    }

    const client = await redis
        .createClient({ url: "redis://localhost" })
        .on("error", (err) => console.log(err))
        .connect();

    client.subscribe(channels, (message, channel) => {
        console.log(`> [${message}] from [${channel}]`);
    });

    console.log(`> reading messages from [${channels.join(", ")}]`);
}

startReceiver();
