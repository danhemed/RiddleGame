import { CRUD } from "../Server/services/generic.crud.js";
import { Menu, MenuCreateRiddle, MenuUpdateRiddle } from "./menus.js";
import { checkID } from "../Server/services/checkID.js";
import { PlayGame} from "./playGame.js";

const riddle = new CRUD("../Server/db/riddles.txt");

let choice;

do {
    choice = Menu();

    switch (choice) {
        case '1':
            await PlayGame();
            break;
        case '2':
            await riddle.Create(MenuCreateRiddle());
            break;
        case '3':
            console.log(await riddle.GetAll());
            break;
        case '4':
            await riddle.Update(await checkID(await riddle.GetAll()), MenuUpdateRiddle())
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