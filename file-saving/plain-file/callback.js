import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { fileURLToPath } from "url";

function saveFile() {
    const filePath = path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "data.txt"
    );

    fs.open(filePath, "w", (err, fd) => {
        if (err) console.error(err);
        const data = randomUUID();

        fs.write(fd, data, (err) => {
            if (err) console.error(err);
        });

        fs.close(fd, (err) => {
            if (err) console.error(err);
            console.log("closing file...");
        });
    });
}

saveFile();
