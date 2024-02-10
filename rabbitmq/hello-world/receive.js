import amqp from "amqplib/callback_api.js";

amqp.connect("amqp://localhost", (err0, connection) => {
    if (err0) throw err0;

    connection.createChannel((err1, channel) => {
        if (err1) throw err1;

        let queue = "hello";

        channel.assertQueue(queue, { durable: false });
        channel.consume(
            queue,
            (msg) => {
                console.log(" [x] Received %s", msg.content.toString());
            },
            { noAck: true }
        );
    });
});
