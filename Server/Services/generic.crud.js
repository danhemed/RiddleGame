import { ReadFile, WriteFile } from "../DAL/fs.dal.js";

export class CRUD {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async GetAll() {
        const data = await ReadFile(this.filePath);
        try {
            return JSON.parse(data || "[]");
        } catch (err) {
            console.log(`ERROR! GetAll-JSON.parse: ${err}`);
            return [];
        }
    }

    async Create(newItem) {
        const items = await this.GetAll();

        const exists = items.some(i => Number(i.id) == Number(newItem.id));
        if (!exists) {
            items.push(newItem);
        } else {
            console.log(`The id already exists!`);
            return;
        }

        let dataString = "";
        try {
            dataString = JSON.stringify(items, null, 2);
        } catch (err) {
            console.log(`ERROR! Create-JSON.stringify: ${err}`);
        }
        await WriteFile(this.filePath, dataString);
        console.log(`Created item with id ${newItem.id}`);
        return newItem;
    }

    async Update(id, updateItem) {
        id = Number(id);
        const items = await this.GetAll();
        const index = items.findIndex(item => Number(item.id) === id);
        if (index === -1) {
            throw new Error(`ERROR! Item isn't found!`);
        }
        
        items[index] = {...items[index], ...updateItem};
        let dataString = "";
        try {
            dataString = JSON.stringify(items, null, 2);
        } catch (err) {
            console.log(`ERROR! Update-JSON.stringify: ${err}`);
        }
        await WriteFile(this.filePath, dataString);
        return items[index];
    }

    async Delete(id) {
        id = Number(id);
        let items = await this.GetAll();
        const len = items.length;
        items = items.filter(item => Number(item.id) !== id);
        if (items.length === len) {
            throw new Error(`Nothing has changed, maybe ID doesn't exist.`)
        }
        let dataString = "";
        try {
            dataString = JSON.stringify(items, null, 2);
        } catch (err) {
            console.log(`ERROR! Delete-JSON.stringify: ${err}`);
        }
        await WriteFile(this.filePath, dataString);
        return { deletedId: id };
    }
}