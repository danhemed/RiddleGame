import express from "express";
import { getAllRiddlesServer, createNewRiddleServer, updateRiddleServer, deleteRiddleServer } from "../ctrl/riddles.ctrl.js";

const router = express.Router();

router.get('/', getAllRiddlesServer);

router.post('/', createNewRiddleServer);

router.put('/:id', updateRiddleServer);

router.delete('/:id', deleteRiddleServer);

export default router;
