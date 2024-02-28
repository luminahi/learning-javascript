import amqp from "amqplib/callback_api.js";

amqp.connect("amqp://localhost", (err0, connection) => {
    if (err0) throw err0;

    connection.createChannel((err1, channel) => {
        if (err1) throw err1;

        const exchange = "logs";

        channel.assertExchange(exchange, "fanout", { durable: false });

        channel.assertQueue("", { exclusive: true }, (err2, data) => {
            if (err2) throw err2;

            console.log("[*] waiting for messages in %s.", data.queue);
            channel.bindQueue(data.queue, exchange, "");
            channel.consume(data.queue, (msg) => {
                if (msg) {
                    console.log("[x] %s", msg.content.toString());
                }
            });
        });
    });
});
