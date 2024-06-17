import { createReadStream } from "fs";
import { createServer } from "http";
import { createGzip } from "zlib";
import { getFilePath } from "../util/helper.js";

/**
 * Reads the content of the specified file, compresses the
 * data using Gzip and returns a Gzip instance.
 * @param {string} filename
 * @returns A gzip instance containing the compressed data.
 */
function compressData(filename) {
    const filepath = getFilePath(filename, import.meta.url);
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
