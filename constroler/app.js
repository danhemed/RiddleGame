import readline from 'readline-sync';
import fs from 'fs';

import PlayerClass from '../classes/Player.js';
import RiddleClass from '../classes/Riddle.js';
import PlayerSer from '../services/player.ser.js';
import RiddleSer from '../services/riddle.ser.js';
import playerName from '../Player/playerName.js';

const AllRiddle = JSON.parse(fs.readFileSync("./riddles/db.txt", "utf-8"));

function StartGame() {
    const player = new Player(playerName);
    console.log(`\n*** WELCOME ${player.name.toUpperCase()} TO RIDDLE GAME ***\n`);

    let counter = 0;

    while (counter < AllRiddle.length) {
        const theRiddel = AllRiddle[counter];
        const riddle = new Riddle(theRiddel.id, theRiddel.name, theRiddel.taskDescription, theRiddel.correctAnswer);

        const start = Date.now();
        let correctAnswer = false;

        while (!correctAnswer) {
            console.log(`~~ Level ${counter + 1} ~~`);
            
            let answer = riddle.ask();

            if (answer.toLowerCase() === "exit") {
                console.log("You out of the Game!\n");
                return;
            }

            if (answer.toLowerCase() === theRiddel.correctAnswer.toLowerCase()) {
                console.log("YOU RIGHT! CORRECT ANSWER!!\n");
                correctAnswer = true;
            } else {
                console.log("YOU WORNG! TRY AGAIN!!");
            }
        }

        const end = Date.now();
        player.recordTime(start, end);
        counter++;
    }
    console.log(`YOU WIN!!!\n`);
    player.showStats();
}

while (true) {
    const input = readline.question("\nChoose: start / exit\n");

    if (input.toLowerCase() === "exit") {
        console.log("GOODBYE!");
        break;
    }

    if (input.toLowerCase() === "start") {
        StartGame();
    } else {
        console.log("Choose only 'start' or 'exit'!");
    }
}