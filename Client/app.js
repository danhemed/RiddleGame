import { CRUD } from "../Server/services/generic.crud.js";
import { Menu, MenuRiddle, MenuPlayer, MenuDelete } from "./menus.js";

const player = new CRUD("../Server/db/players.txt");
const riddle = new CRUD("../Server/db/riddles.txt");
const leader = new CRUD("../Server/db/riddles.txt");


do {
    switch (Menu()) {
        case '1':
            break;
        case '2':
            await riddle.Create(MenuRiddle());
            break;
        case '3':
            console.log(await riddle.GetAll());
            break;
        case '4':
            await riddle.Update(MenuRiddle().id, MenuRiddle())
            break;
        case '5':
            await riddle.Delete(MenuDelete());
            break;
        case '6':
            break;
        default:
            console.log(`plase choose only number from 0 to 6!!`);
            break;
    }
} while (choice !== '0');