import { CRUD } from "../Server/services/generic.crud.js";
import { Menu, MenuRiddle, MenuDelete } from "./menus.js";
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
            await riddle.Create(MenuRiddle());
            break;
        case '3':
            console.log(await riddle.GetAll());
            break;
        case '4':
            await riddle.Update(MenuRiddle())
            break;
        case '5':
            await riddle.Delete(MenuDelete());
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