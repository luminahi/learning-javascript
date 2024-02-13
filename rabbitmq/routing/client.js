import amqp from "amqplib/callback_api.js";

amqp.connect("amqp://localhost", (err0, connection) => {
    if (err0) throw err0;

    connection.createChannel((err1, channel) => {
        if (err1) throw err1;

        const exchange = "direct_logs";
        const routingKey = process.argv.slice(2, 3).join(" ") || "info";
        const msg = process.argv.slice(3).join(" ") || "default message";

        channel.assertExchange(exchange, "direct", { durable: false });
        channel.publish(exchange, routingKey, Buffer.from(msg));
        console.log("message [%s] sent with [%s] routing key", msg, routingKey);
    });

    setTimeout(() => {
        connection.close();
    }, 500);
});
