import { connect } from "amqplib";

async function main() {
    const connection = await connect("amqp://localhost");
    const channel = await connection.createChannel();

    const serverQueue = "confirm_queue";

    await channel.assertQueue(serverQueue, { durable: false });

    channel.consume(serverQueue, (data) => {
        const [task, time] = data.content.toString("utf-8").split(" ");
        console.log("[x] resolving task: %s in %sms", task, time * 100);

        setTimeout(() => {
            channel.ack(data);
            channel.sendToQueue(data.properties.replyTo, Buffer.from(task), {
                correlationId: data.properties.correlationId,
            });
        }, time * 100);
    });
}

main();
