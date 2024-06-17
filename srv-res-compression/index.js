import { createReadStream } from "fs";
import { createServer } from "http";
import { createGzip } from "zlib";
import path from "path";
import { fileURLToPath } from "url";

function getPath(filename) {
    return path.join(path.dirname(fileURLToPath(import.meta.url)), filename);
}

/**
 * Open a file with the provided filename and compress their data.
 * @param {string} filename
 * @returns a Gzip instance
 */
function compressData(filename) {
    const filepath = getPath(filename);
    const readStream = createReadStream(filepath, { encoding: "utf-8" });

    const gzip = createGzip();
    readStream.pipe(gzip);

    return gzip;
}

const server = createServer((_req, res) => {
    res.setHeader("Content-Encoding", "gzip");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.statusCode = 200;
    compressData("data.txt").pipe(res);
});

server.listen(3000, () => {
    console.log(`application running at port 3000`);
});
