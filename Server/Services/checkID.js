import { MenuId } from "../../Client/menus.js";

export async function checkID(allItems) {
    if (allItems.length === 0) {
        console.log(`There is no data at all!\n`)
        return null;
    }
    while (true) {
        const id = Number(MenuId());
        const exists = allItems.some(item => item.id == id);
        if (!exists) {
            console.log(`ID NOT FOUND! TRY AGAIN!`);
            continue;
        }
        return id;
    }
}