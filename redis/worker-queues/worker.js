import redis from "redis";

async function worker() {
    const client = await redis
        .createClient({ url: "redis://localhost" })
        .on("error", (err) => console.log(err))
        .connect();

    const args = process.argv.slice(2);
    const queue = args.length > 0 ? args[0] : "general";

    async function processTask() {
        const task = await client.brPop(queue, 0);
        console.log(`[x] ${task.element} processed`);
    }

    async function startProcessing() {
        console.log(`[x] processing [${queue}] queue`);
        while (true) {
            await processTask();
        }
    }

    startProcessing();
}

worker();
