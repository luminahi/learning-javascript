import redis from "redis";

async function sendTask() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.log("provide at least one argument");
        process.exit(0);
    }

    const queue = args[0];
    const elements = args.length > 1 ? args.slice(1) : "empty";

    const client = await redis
        .createClient({ url: "redis://localhost" })
        .on("error", (err) => console.log(err))
        .connect();

    const task = await client.lPush(queue, elements);
    console.log(task);

    await client.disconnect();
}

sendTask();
