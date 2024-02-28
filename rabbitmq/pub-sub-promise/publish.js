import amqp from "amqplib";

async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
    const args = process.argv.slice(2);

    if (args.length < 1) {
        return console.log("provide at least one argument");
    }

    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const exchange = args[0];
    const type = "fanout";
    const msg = args.length > 1 ? args.slice(1).join(" ") : "default message";

    await channel.assertExchange(exchange, type, { durable: false });
    channel.publish(exchange, "", Buffer.from(msg));

    await delay(500);
    await connection.close();
}

main();
