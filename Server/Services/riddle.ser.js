import { CRUD } from "./generic.crud.js";

const riddle = new CRUD("../db/riddles.txt");

export function showAllRiddles() {
    riddle.GetAll().then(r => console.log(r));
}

const json = {
    "id": 1,
    "name": "Update Riddle",
    "taskDescription": "Who am i?",
    "correctAnswer": "dan"
}

export async function createRiddle(json) {
    const riddles = await riddle.GetAll();
    const exist = riddles.some(r => r.id == json.id);
    if (!exist) {
        riddle.Create(json);
    } else {
        console.log(`The id already exists!`);
        return;
    }
}

showAllRiddles();

createRiddle(json);