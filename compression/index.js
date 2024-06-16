import zlib from "zlib";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

function getPath(filename) {
    return path.join(path.dirname(fileURLToPath(import.meta.url)), filename);
}

const readStream = fs.createReadStream(getPath("example.txt"));
const writeStream = fs.createWriteStream(getPath("example.txt.gz"));

const gzip = zlib.createGzip();

readStream.pipe(gzip).pipe(writeStream);

writeStream.on("finish", () => {
    console.log("file compressed!");
});
