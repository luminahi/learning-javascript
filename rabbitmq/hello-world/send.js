import amqp from "amqplib/callback_api.js";

amqp.connect("amqp://localhost", (err0, connection) => {
    if (err0) throw err0;

    connection.createChannel((err1, channel) => {
        if (err1) throw err1;

        let queue = "hello";
        let msg = "hello world";

        channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
    });

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
});
