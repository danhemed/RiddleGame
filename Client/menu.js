import readline from "readline-sync";

export function Menu() {
    return readline.question(
    "What do you want to do?\n" +
    "1. Play the game\n" +
    "2. Create a new riddle\n" +
    "3. Read all riddles\n" +
    "4. Update an existing riddle\n" +
    "5. Delete a riddle\n" +
    "6. View leaderboard\n"
    );
}