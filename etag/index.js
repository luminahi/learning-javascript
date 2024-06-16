import { readFileSync } from "fs";
import { createServer } from "http";
import crypto from "crypto";

function generateEtag(data) {
    return crypto.createHash("md5").update(data).digest("hex");
}

const server = createServer((req, res) => {
    const data = readFileSync("input.bin");
    const etag = generateEtag(data);

    if (req.headers["if-none-match"] === etag) {
        res.statusCode = 304;
        return res.end();
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("ETag", etag);
    return res.end(data);
});

server.listen(3000, () => {
    console.log("running at port 3000");
});
