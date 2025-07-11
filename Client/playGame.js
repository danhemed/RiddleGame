import Riddle from "../Server/class/Riddle.js";
import Player from "../Server/class/Player.js";
import { CRUD } from "../Server/services/generic.crud.js";
import { MenuPlayer } from "./menus.js";

const playerCrud = new CRUD("../Server/db/players.txt");
const riddleCrud = new CRUD("../Server/db/riddles.txt");

async function PlayerEntry() {
    const jsonPlayer = MenuPlayer();
    const players = await playerCrud.GetAll();

    let playerExists = players.find(p => p.id === jsonPlayer.id);
    if (!playerExists) {
        playerExists = {...jsonPlayer, times: []};
        await playerCrud.Create(playerExists);
        console.log(`Create a new Player: ${playerExists.name}`);
    } else {
        console.log(`welcome again ${playerExists.name} `)
    }
    const player = new Player(playerExists.name);
    player.id = playerExists.id;
    player.times = playerExists.times || [];

    return player;
}

async function PlayRiddles(player) {
    const allRiddles = await riddleCrud.GetAll();
    const riddles = allRiddles.map(r => new Riddle(r.id, r.name, r.taskDescription, r.correctAnswer));

    const start = Date.now();
    let mistakes = 0;
    let level = 1;

    for (const riddle of riddles) {
        console.log(`level ${level}: ${riddle.name}`);

        let answeredCorrectly = false;
        
        while (!answeredCorrectly) {
            const answer = riddle.ask();
            if (answer.toLowerCase() !== riddle.correctAnswer.toLowerCase()) {
                mistakes++;
                console.log(`You Were Wrong! Mistake ${mistakes}! Try again!\n`)
    
                if (mistakes >=3) {
                    console.log(`Game over!\n`);
                    return false;
                }
            } else {
                console.log(`You are right!\n`)
                answeredCorrectly = true;
                level++;
            }
        } 
    }
    console.log(`YOU ARE A CHAMPION! YOU WON!!\n`);

    const end = Date.now();
    player.recordTime(start, end);
    player.showStats();
    console.log();

    return true;
}

export async function PlayGame() {
    const player = await PlayerEntry();
    const won = await PlayRiddles(player);
    
    if (won) {
        await playerCrud.Update({
            id : player.id,
            name : player.name,
            times : player.times
        })
    }
}

export async function ShowPlayerVictories() {
    const players = await playerCrud.GetAll();

    console.log(`LeaderBoard:`);
    console.log(`=`.repeat(30));

    const playerBestTime = players.map(p => {
        const bestTime = p.times && p.times.length > 0 ? Math.min(...p.times) : Infinity;
        return {...p, bestTime};
    })

    playerBestTime.sort((a, b) => a.bestTime - b.bestTime);

    playerBestTime.forEach((p, i) => {
        if (p.bestTime === Infinity) {
            console.log(`${i+1}. ${p.name} - No wins yet`);
        } else {
            console.log(`${i+1}. ${p.name} - ${p.bestTime} seconds`);
        }
    });
}