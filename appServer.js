import express from "express";
import router from "./Server/routes/riddleRouter.js";
import { CRUD } from "./Server/services/generic.crud.js";
import { Menu, MenuCreateRiddle, MenuUpdateRiddle } from "./Client/menus.js";
import { checkID } from "./Server/services/checkID.js";
import { PlayGame} from "./Client/playGame.js";

const PORT = process.env.PORT || 3005;

const app = express();

app.use(express.json());

app.use('/riddles', router);

app.listen(PORT, () => {
    console.log(`Server runing on http://localhost:${PORT}...`);
})



const riddle = new CRUD("./Server/db/riddles.txt");

let choice;

do {
    choice = Menu();

    switch (choice) {
        case '1':
            const playGameServer = await PlayGameServer();
            if (playGameServer === null) {
                break;
            }
            break;
        case '2':
            await riddle.Create(MenuCreateRiddle());
            break;
        case '3':
            console.log(await riddle.GetAll());
            break;
        case '4':
            const allriddles = await riddle.GetAll();
            const idExists = await checkID(allriddles);
            if (idExists === null) {
                break;
            }
            await riddle.Update(idExists, MenuUpdateRiddle())
            break;
        case '5':
            console.log(await riddle.Delete(await checkID(await riddle.GetAll())));
            break;
        case '6':
            await ShowPlayerVictories();
            break;
        case '0':
            console.log(`BYE BYE!! `);
            break;
        default:
            console.log(`plase choose only number from 0 to 6!!`);
            break;
    }
} while (choice !== '0');