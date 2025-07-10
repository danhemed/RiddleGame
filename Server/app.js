import express from "express";

const PORT = 3002;

const app = express();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server runing on http://localhost:${PORT}...`);
})