import { dirname, join, resolve } from "path";
import { URL, fileURLToPath } from "url";

/**
 * Constructs an absolute file path based on filename and url
 * @param {string} filename
 * @param {URL} url
 * @returns {string} absolute path of the module
 */
export function getFilePath(filename, url) {
    return join(dirname(fileURLToPath(url)), filename);
}

// export function getRootDir() {
//     return resolve(dirname(fileURLToPath(import.meta.url)), "..");
// }
