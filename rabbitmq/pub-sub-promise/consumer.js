import amqp from "amqplib";

async function main() {
    const args = process.argv.slice(2);

    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const exchange = args[0] ?? "info_logs";
    const type = "fanout";

    await channel.assertExchange(exchange, type, { durable: false });
    const data = await channel.assertQueue("", { exclusive: true });
    console.log("[x] waiting for messages from [%s] exchange", exchange);

    await channel.bindQueue(data.queue, exchange, "");
    channel.consume(data.queue, (msg) => {
        console.log("[x] [%s] received", msg.content);
    });
}

main();
