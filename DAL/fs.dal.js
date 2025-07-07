import fs from "fs";

export async function ReadFile(path) {
    return new Promise((res, rej) => {
        fs.readFile(path, "utf-8", (err, data) => {
            if (err) {
                rej(`ReadFile-ERROR: ${err}`);
            }
            res(data);
        })
    })
}

export async function WriteFile(path) {
    return new Promise((res, rej) => {
        if (err) {
            rej(`WriteFile-ERROR: ${err}`);
        }
        res(data);
    })
}