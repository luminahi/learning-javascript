import amqp from "amqplib";

async function sendMessage(queue, msg) {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createConfirmChannel();

    await channel.assertQueue(queue, { durable: false });
    channel.publish("", queue, Buffer.from(msg), {}, (err, ok) => {
        if (err) throw err;
        console.log("[x] [%s] received by broker", msg);
    });
    console.log("[x] [%s] sent to broker", msg);

    await channel.waitForConfirms();

    await channel.close();
    connection.close();
}

export { sendMessage };
