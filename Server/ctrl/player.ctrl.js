import { CRUD } from "../services/generic.crud.js";

const crudPlayer = new CRUD("./db/players.txt");

export const getAllPlayersServer = async (req, res) => {
    try {
        res.json(await crudRiddle.GetAll())
    } catch (err) {
        res.status(500).json({ error: `from get all players server ${err.message}` })
    }
}

export const createNewPlayerServer = async (req, res) => {
    try {
        const newRiddle = await crudRiddle.Create({ ...req.body });
        res.status(201).json(newRiddle);
    } catch (err) {
        res.status(500).json({ error: `from create new player server ${err.message}` });
    }
}

export const updatePlayerServer = async (req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: 'Missing id' });

    try {
        const updateRiddle = await crudRiddle.Update(id, { id, ...req.body });
        res.json(updateRiddle);
    } catch (err) {
        res.status(404).json({ error: `from update player server ${err.message}` });
    }
}

export const deletePlayerServer = async (req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: 'Missing id' });

    try {
        const deleteRiddle = await crudRiddle.Delete(req.params.id);
        res.json(deleteRiddle);
    } catch (err) {
        res.status(404).json({ error: `from update player server ${err.message}` });
    }
}