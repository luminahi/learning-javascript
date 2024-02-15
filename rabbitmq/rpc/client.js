import amqp from "amqplib/callback_api.js";

amqp.connect((err0, connection) => {
    if (err0) throw err0;

    connection.createChannel((err1, channel) => {
        if (err1) throw err1;

        channel.assertQueue("", { exclusive: true }, (err2, ok) => {
            if (err2) throw err2;

            const arg = process.argv.length > 2 ? process.argv[2] : 0;

            const correlationId = generateUuid();
            const num = parseInt(arg);
            console.log("[x] requesting fib(%d)", num);

            channel.consume(
                ok.queue,
                (msg) => {
                    if (msg.properties.correlationId == correlationId) {
                        console.log("[.] Got %s", msg.content.toString());
                        setTimeout(() => {
                            connection.close();
                            process.exit(0);
                        }, 500);
                    }
                },
                { noAck: true }
            );

            channel.sendToQueue("rpc_queue", Buffer.from(num.toString()), {
                correlationId,
                replyTo: ok.queue,
            });
        });
    });
});

function generateUuid() {
    return (
        Math.random().toString() +
        Math.random().toString() +
        Math.random().toString()
    );
}
