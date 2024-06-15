import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { fileURLToPath } from "url";

function getPath(filename) {
    return path.join(path.dirname(fileURLToPath(import.meta.url)), filename);
}

function saveSyncFile() {
    let fd;
    const filePath = getPath("data.txt");
    const data = randomUUID();

    try {
        fd = fs.openSync(filePath, "w");
        fs.writeFileSync(fd, data);
    } catch (err) {
        if (err instanceof Error) console.error(err);
    } finally {
        fs.closeSync(fd);
    }
}

saveSyncFile();
