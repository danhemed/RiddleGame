import readline from "readline-sync";

export function Menu() {
    return readline.question(
    "What do you want to do?\n" +
    "1. Play the game >>\n" +
    "2. Create a new riddle >>\n" +
    "3. Read all riddles >>\n" +
    "4. Update an existing riddle >>\n" +
    "5. Delete a riddle >>\n" +
    "6. View leaderboard >>\n" +
    "0. Exit >>\n:"
    );
}

export function MenuRiddle() {
    const id = readline.question('Enter ID: ');
    const name = readline.question('Enter Name: ');
    const taskDescription = readline.question('Enter task Description: ');
    const correctAnswer = readline.question('Enter correct Answer: ');

    return {
        id,
        name,
        taskDescription,
        correctAnswer
    };
}

export function MenuDelete() {
    return readline.question("Enter ID to Delete: ");
}

export function MenuPlayer() {
    const id = readline.question('Enter ID: ');
    const name = readline.question('Enter Name: ');

    return {
        id,
        name
    };
}

export function MenuPlayGameLevel() {
    return readline.question("Choose Level:\n1. Easy >>\n2. Medium >>\n3. Hard >>\n:");
}

export function MenuPlayerAnswer() {
    return readline.question("Ente Your Answer: ")
}
