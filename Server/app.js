import http from "http";
import { CRUD } from "./Services/generic.crud.js";

const riddlesCRUD = new CRUD("./DataBase/riddles.txt");

const server = http.createServer((req, res ) => {
    if (req.method.toUpperCase() === "GET" && req.url === "/riddles") {
        riddlesCRUD.GetAll()
            .then(riddles => {
                res.writeHead(200, { "constent-type" : "application/json"});
                res.end(JSON.stringify(riddles));
            })
            .catch(err => {
                res.writeHead(500);
                res.end(`Error: ${err}`);
            })
    }
})

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is runing on http://localhost:${PORT}`);
})