import amqp from "amqplib/callback_api.js";

const size = 5;
const messages = Array(size)
    .fill(0)
    .map((_, index) => `message: ${index}`);

amqp.connect("amqp://localhost", (connErr, connection) => {
    if (connErr) throw connErr;

    connection.createConfirmChannel((channelErr, channel) => {
        if (channelErr) throw channelErr;

        const queue = "t2_queue";

        channel.assertQueue(queue, { durable: false });

        channel.sendToQueue(queue, Buffer.from(messages.pop()));
        channel.waitForConfirms((waitErr) => {
            if (waitErr) {
                console.error("message did not make to the broker");
                if (waitErr instanceof Error) console.error(waitErr.message);
            }

            connection.close();
        });

        console.log("all messages were processed");
    });
});
