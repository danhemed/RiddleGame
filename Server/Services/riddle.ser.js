import readLine from "readline-sync";

export async function GetData() {
    const data = readLine.question();
    try {
        JSON.parse(data);
    } catch (err) {
        console.log(`GetData-JSONParse ERROR: ${err}`);
    }
    if (typeof data === "object") {
        return data;
    } else {
        console.log(`Enter only Object like: { "id" : "1" }`);
    }
}


export async function ReadAllRiddle(path) {
    ReadFile(path)
        .then(res => console.log(`data:\n${res}`));
}



export async function CreateRiddle(path, newRiddle) {
    return new Promise((res, rej) => {
        fs.readFile(path, "utf-8", (err, data)=> {

            if (err) {
                return rej(`Create-Read: ${err}`);
            }

            let riddles = [];
            try {
                riddles = JSON.parse(data);
            } catch (err) {
                return rej(`Create-Json: ${err}`);
            }

            const usersID = riddles.map(r => r.id);
            let maxID = 0;
            if (usersID.length > 0) {
                maxID = Math.max(...usersID);
            }
            const newID = maxID + 1;

            const riddle = {id: newID, ...newRiddle};
            riddles.push(riddle);

            fs.writeFile(path, JSON.stringify(riddles, null, 2), (err) => {
                if (err) {
                    return rej(`Create-Write: ${err}`);
                }
                res(riddle);
            });
        }); 
    });
}


export async function UpdateRiddle(path, newRiddleWithId) {
    return new Promise((res, rej) => {
        fs.readFile(path, "utf-8", (err, data) => {
            if (err) {
                return rej(`Update-Read: ${err}`);
            }

            let riddles = [];
            try {
                riddles = JSON.parse(data);
            } catch (err) {
                return rej(`Update-Json: ${err}`);
            }

            let idOfNewRiddle = 1;
            try {
                idOfNewRiddle = newRiddleWithId.id;
            } catch (err) {
                console.log(`Update-id: ${err}`);
            }

            let indexRiddle = 0;

            try {
                indexRiddle = riddles.findIndex(riddle => riddle.id === idOfNewRiddle);
            } catch (err) {
                console.log(`Update-index ${err}`);
            }

            riddles[indexRiddle] = {...riddles[indexRiddle], ...newRiddleWithId};

            fs.writeFile(path, JSON.stringify(riddles, null, 2), (err) => {
                if (err) {
                    return rej(`Update-Write: ${err}`);
                }
                res(newRiddleWithId);
            });
        });
    });
}

export async function DeleteRiddle(path, id) {
    return new Promise((res, rej) => {
        fs.readFile(path, "utf-8", (err, data) => {
            if (err) {
                return rej(`Delete-Read: ${err}`);
            }

            let riddles = [];
            try {
                riddles = JSON.parse(data);
            } catch (err) {
                return rej(`Delete-Json: ${err}`);
            }

            try {
                riddles = riddles.filter(riddle => riddle.id !== id);
            } catch (err) {
                console.log(`Delete-filter: ${err}`);
            }

            fs.writeFile(path, JSON.stringify(riddles, null, 2), (err) => {
                if (err) {
                    return rej(`Delete-Write: ${err}`);
                }
                res(id);
            });
        });
    });
}


// const path = "../dataBase/riddles.txt";

// await CreateRiddle(path, {
//     name: "Logic Q",
//     taskDescription: "What has hands but can’t clap?",
//     correctAnswer: "clock"
// })
//     .then(res => {
//         console.log(`New Riddle:\n${JSON.stringify(res, null, 2)}`);
//     })
//     .catch(err => {
//     if (err instanceof Error) {
//         console.log(`Error: ${err.message}`);
//     } else if (typeof err === "object") {
//         console.log("Error:", JSON.stringify(err, null, 2));
//     } else {
//         console.log(`Error: ${err}`);
//     }
//     });


// await ReadAllRiddles(path)
//     .then(res => {
//         console.log(`All Riddles:\n${JSON.stringify(res, null, 2)}`);
//     })
//     .catch(err => {
//     if (err instanceof Error) {
//         console.log(`Error: ${err.message}`);
//     } else if (typeof err === "object") {
//         console.log("Error:", JSON.stringify(err, null, 2));
//     } else {
//         console.log(`Error: ${err}`);
//     }
//     });

// await UpdateRiddle(path, {
//     id : 1,
//     name: "Update Riddle",
//     taskDescription: "Who am i?",
//     correctAnswer: "dan"
// })
//     .then(res => {
//         console.log(`Update Riddle:\n${JSON.stringify(res, null, 2)}`);
//     })
//     .catch(err => {
//     if (err instanceof Error) {
//         console.log(`Error: ${err.message}`);
//     } else if (typeof err === "object") {
//         console.log("Error:", JSON.stringify(err, null, 2));
//     } else {
//         console.log(`Error: ${err}`);
//     }
//     });

// await DeleteRiddle(path, 2)
//     .then(res => {
//         console.log(`Delete Riddle: ${res}`);
//     })
//     .catch(err => {
//     if (err instanceof Error) {
//         console.log(`Error: ${err.message}`);
//     } else if (typeof err === "object") {
//         console.log("Error:", JSON.stringify(err, null, 2));
//     } else {
//         console.log(`Error: ${err}`);
//     }
//     });