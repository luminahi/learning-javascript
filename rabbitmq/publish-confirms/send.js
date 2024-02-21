import amqp from "amqplib/callback_api.js";

const size = 50_000;
const messages = Array(size)
    .fill(0)
    .map((_, index) => `message: ${index}`);

amqp.connect("amqp://localhost", (connErr, connection) => {
    if (connErr) throw connErr;

    connection.createConfirmChannel((channelErr, channel) => {
        if (channelErr) throw channelErr;

        const queue = "t2_queue";
        channel.assertQueue(queue, { durable: false });

        // const confirmMap = new Map();

        while (messages.length > 0) {
            const index = messages.length - 1;
            const message = messages.pop();
            // confirmMap.set(index, message);

            channel.sendToQueue(queue, Buffer.from(message));
            console.log("[x] [%s] sent", message);
        }

        channel.waitForConfirms((err) => {
            if (err) throw err;
            connection.close();
        });
    });
});
