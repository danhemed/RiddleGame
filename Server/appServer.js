import express from "express";
import router from "./routes/riddleRouter.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/riddles', router);

app.listen(PORT, () => {
    console.log(`Server runing on http://localhost:${PORT}...`);
})