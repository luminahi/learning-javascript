import amqp from "amqplib/callback_api.js";

amqp.connect("amqp://localhost", (err0, connection) => {
    if (err0) throw err0;

    connection.createChannel((err1, channel) => {
        if (err1) throw err1;

        const exchange = "logs";
        const msg = process.argv.slice(2).join(" ") || "default message";

        channel.assertExchange(exchange, "fanout", { durable: false });
        channel.publish(exchange, "", Buffer.from(msg));
        console.log("[x] Sent %s", msg);
    });

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
});
