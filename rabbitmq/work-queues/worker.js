import amqp from "amqplib/callback_api.js";

amqp.connect("amqp://localhost", (err0, connection) => {
    if (err0) throw err0;

    connection.createChannel((err1, channel) => {
        if (err1) throw err1;

        const queue = "task_queue";

        channel.assertQueue(queue, { durable: false });

        channel.consume(
            queue,
            (msg) => {
                const parts = msg.content.toString().split(".");
                const seconds = parts.length - 1;

                setTimeout(() => {
                    console.log(`${parts[0]} task ended!`);
                }, seconds * 1000);
            },
            { noAck: true }
        );
    });
});
