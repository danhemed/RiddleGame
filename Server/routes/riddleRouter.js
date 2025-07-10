import express from "express";

const router = express.Router();

router.get('/riddles', (req, res) => {
    req.json(riddles);
} )
