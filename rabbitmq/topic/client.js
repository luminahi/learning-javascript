import amqp from "amqplib/callback_api.js";

amqp.connect((err0, connection) => {
    if (err0) throw err0;

    connection.createChannel((err1, channel) => {
        if (err1) throw err1;

        const exchange = "topic_logs";
        const args = process.argv.slice(2);

        const msg = args.pop() || "default message";
        const condition = args.length > 0 ? args.join(".") : "info.#";

        channel.assertExchange(exchange, "topic", { durable: false });
        channel.publish(exchange, condition, Buffer.from(msg));

        console.log("[x] [%s] sent", msg);
    });

    setTimeout(() => {
        connection.close();
    }, 500);
});
