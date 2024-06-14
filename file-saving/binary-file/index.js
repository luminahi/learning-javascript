import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

async function saveBinaryFile() {
    const filepath = path.resolve("data.bin");
    const fd = await fs.open(filepath, "w");

    const textData = randomUUID();
    const buffer = Buffer.from(textData.replace(/-/g, ""), "hex");

    await fs.writeFile(fd, buffer);
    await fd.close();
}

saveBinaryFile();
