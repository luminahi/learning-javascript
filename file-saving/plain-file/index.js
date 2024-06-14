import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

async function savePlainTextFile() {
    const filepath = path.resolve("data.txt");
    const fd = await fs.open(filepath, "w");

    const textData = randomUUID();

    await fs.writeFile(fd, textData);
    await fd.close();
}

savePlainTextFile();
