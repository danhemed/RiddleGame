export default class Player {
    constructor(name) {
        this.name = name;
        this.times = [];
    }

    recordTime(start, end) {
        const seconds = (end - start) / 1000;
        this.times.push(seconds);
    }

    showStats() {
        const totalTime = this.times.reduce((sum, i) => sum + i, 0);
        const averageTime = totalTime / this.times.length;

        console.log(`This ${this.name}'s stats: `);
        console.log("Total Time: " + totalTime);
        console.log("Average Time: " + averageTime);
    }
}