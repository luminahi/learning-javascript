import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { fileURLToPath } from "url";

function getPath(filename) {
    return path.join(path.dirname(fileURLToPath(import.meta.url)), filename);
}

async function saveAsyncFile() {
    let fd;
    const filepath = getPath("data.txt");
    const data = randomUUID();

    try {
        fd = await fs.open(filepath, "w");
        await fs.writeFile(fd, data);
    } catch (err) {
        if (err instanceof Error) console.error(err);
    } finally {
        await fd.close();
    }
}

saveAsyncFile();
