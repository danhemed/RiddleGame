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

        const exists = items.some(i => i.id == newItem.id);
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

    async Update(updateItem) {
        const items = await this.GetAll();
        const index = items.findIndex(item => item.id === updateItem.id);
        if (index === -1) {
            throw new Error(`ERROR! Item isn't found!`);
        }
        updateItem.id = items[index].id;
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
        let items = await this.GetAll();
        const len = items.length;
        items = items.filter(item => item.id !== id);
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