import amqp from "amqplib/callback_api.js";

amqp.connect("amqp://localhost", (err0, connection) => {
    console.log("Waiting for messages. To exit press CTRL+C");
    if (err0) throw err0;

    connection.createChannel((err1, channel) => {
        if (err1) throw err1;

        const queue = "task_queue";

        channel.assertQueue(queue, { durable: true }, (err2, info) => {
            if (err2) throw err2;
            console.log(info);
        });

        channel.prefetch(1);

        channel.consume(
            queue,
            (msg) => {
                const parts = msg.content.toString().split(".");
                const seconds = parts.length - 1;

                setTimeout(() => {
                    console.log(`[${parts[0]}] => task ended!`);
                    channel.ack(msg);
                }, seconds * 1000);
            },
            { noAck: false }
        );
    });

    process.on("SIGINT", () => {
        connection.close((err) => {
            if (err) console.log(err);
        });
        console.log("\ngracefully exiting...");
        process.exit(0);
    });
});
