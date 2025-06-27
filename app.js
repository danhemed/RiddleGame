import readline from 'readline-sync';

import Player from './classes/Player.js';
import playerName from './Player/playerName.js';
import AllRiddle from './riddles/AllRiddles.js';
import Riddle from './classes/Riddle.js';

function StartGame() {
    const player = new Player(playerName);
    console.log(`\n*** WELCOME ${player.name} TO RIDDLE GAME ***\n`);

    let counter = 0;

    while (counter < AllRiddle.length) {
        const theRiddel = AllRiddle[counter];
        const riddle = new Riddle(theRiddel.id, theRiddel.name, theRiddel.taskDescription, theRiddel.correctAnswer);

        const start = Date.now();
        let correctAnswer = false;

        while (!correctAnswer) {
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