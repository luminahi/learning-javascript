import fs from "fs/promises";
import protobuf from "protobufjs";

const root = protobuf.loadSync("user.proto");
const User = root.lookupType("User");

const user = User.create({
    name: "alex lima",
    age: 29,
    favoriteColor: "green",
    job: "Programmer",
});

const buffer = User.encode(user).finish();

await fs.writeFile("data.bin", buffer);
await fs.writeFile("data.json", JSON.stringify(user));
