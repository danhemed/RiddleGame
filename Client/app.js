import { CRUD } from "../Server/services/generic.crud.js";

const player = new CRUD("../Server/db/players.txt");
player.Create({id: 1, name: "dan"});

player.GetAll().then(p => console.log(p));