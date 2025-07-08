export function parseBody(req) {
    return new Promise((res, rej) => {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const json = JSON.parse(body || '{}');
                res(json);
            } catch (err) {
                rej(new Error("Invalid JSON body"));
            }
        })

        req.on('error', err => {
            rej(err);
        })
    })
}