import amqp from "amqplib/callback_api.js";

const args = process.argv.slice(2) || "";

amqp.connect("amqp://localhost", (err0, connection) => {
    if (err0) throw err0;

    connection.createChannel((err1, channel) => {
        if (err1) throw err1;

        const exchange = "direct_logs";
        channel.assertExchange(exchange, "direct", {
            durable: false,
        });

        channel.assertQueue("", { exclusive: true }, (err2, data) => {
            if (err2) throw err2;

            if (args.length > 0) {
                args.forEach((pattern) => {
                    channel.bindQueue(data.queue, exchange, pattern);
                });
            } else {
                channel.bindQueue(data.queue, exchange, "info");
            }
            console.log(
                "[x] accepting [%s] messages",
                args.join(", ") || "info"
            );

            channel.consume(data.queue, (msg) => {
                console.log(
                    "[x] [%s] %s",
                    msg.fields.routingKey,
                    msg.content.toString()
                );
            });
        });
    });
});
