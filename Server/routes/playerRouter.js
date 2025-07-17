import express from "express";
import { getAllPlayersServer, createNewPlayerServer, updatePlayerServer, deletePlayerServer } from "../ctrl/player.ctrl.js";

const router = express.Router();

router.get('/', getAllPlayersServer);

router.post('/', createNewPlayerServer);

router.put('/:id', updatePlayerServer);

router.delete('/:id', deletePlayerServer);

export default router;
