import amqp from "amqplib/callback_api.js";

amqp.connect((err0, connection) => {
    if (err0) throw err0;

    connection.createChannel((err1, channel) => {
        if (err1) throw err1;

        const exchange = "topic_logs";
        const args = process.argv.slice(2);

        const condition = args.length > 0 ? args.join(".") : "info.#";

        console.log("[x] accepting [%s] messages", condition);

        channel.assertExchange(exchange, "topic", { durable: false });
        channel.assertQueue("", { exclusive: true }, (err2, ok) => {
            if (err2) throw err2;

            channel.bindQueue(ok.queue, exchange, condition);
            channel.consume(ok.queue, (msg) => {
                console.log(
                    "[x] [%s] -> [%s]",
                    msg.fields.routingKey,
                    msg.content.toString()
                );
            });
        });
    });
});
