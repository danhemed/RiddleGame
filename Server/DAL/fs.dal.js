import fs from "fs/promises";

export async function readFile(path) {
    try {
        return await fs.readFile(path, "utf-8");
    } catch (err) {
        throw new Error(`DAL-readFile ERROR: ${err.message}`);
    }
}

export async function writeFile(path, data) {
    try {
        await fs.writeFile(path, data, "utf-8");
    } catch (err) {
        throw new Error(`DAL-writeFile ERROR: ${err.message}`);
    }
}