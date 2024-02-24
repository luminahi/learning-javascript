import amqp from "amqplib";

async function receiveMessages(queue) {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });
    channel.consume(
        queue,
        (data) => {
            const message = data.content.toString("utf-8");
            console.log("[x] [%s] received by consumer", message);
            channel.ack(data);
        },
        { noAck: false }
    );
}

export { receiveMessages };
