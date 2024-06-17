import { createReadStream } from "fs";
import { createServer } from "http";
import { createGzip } from "zlib";
import path from "path";
import { fileURLToPath } from "url";

function getPath(filename) {
    return path.join(path.dirname(fileURLToPath(import.meta.url)), filename);
}

/**
 * Reads the content of the specified file, compresses the
 * data using Gzip and returns a Gzip instance.
 * @param {string} filename
 * @returns A gzip instance containing the compressed data.
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

    const data = compressData("data.txt");

    data.pipe(res);
});

server.listen(3000, () => {
    console.log(`application running at port 3000`);
});
