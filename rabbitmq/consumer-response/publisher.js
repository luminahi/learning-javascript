import { connect } from "amqplib";

async function main() {
    const args = process.argv.slice(2);

    if (args.length < 2) {
        return console.log("provide at least two arguments");
    }

    const connection = await connect("amqp://localhost");
    const channel = await connection.createChannel();

    const serverQueue = "task_queue";
    const task = args.join(" ");

    const assertQueue = await channel.assertQueue("", { exclusive: true });

    channel.sendToQueue(serverQueue, Buffer.from(task), {
        correlationId: (Math.random() * 1000).toFixed(0).toString(),
        replyTo: assertQueue.queue,
    });

    console.log("[x] [%s] sent", task.split(" ")[0]);

    channel.consume(assertQueue.queue, (data) => {
        console.log("[x] [%s] success", data.content.toString("utf-8"));
        connection.close();
    });
}

main();
