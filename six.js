
let inputs = [
  { time: 38, distance: 234 },
  { time: 67, distance: 1027 },
  { time: 76, distance: 1157 },
  { time: 73, distance: 1236 }
];

let input2 = { time:  38677673, distance: 234102711571236 };

class Race {

  constructor(input) {
    this.timeLimit = input.time;
    this.distanceRecord = input.distance;
    this.trials = [];
    this.runRace(this.timeLimit);
  }

  runRace() {
    for (let r=0; r<=this.timeLimit; r++) {
      this.trials.push(this.trial(r, this.timeLimit));
    }
    this.totalWins = this.trials.filter(t => t.distance > this.distanceRecord).length;
  }

  trial(hold) {
    return { hold: hold, speed: hold, distance: (this.timeLimit - hold) * hold }
  }

};

let total = inputs.reduce((a, i) =>
  new Race(i).totalWins * a, 1);
console.log(total);

console.log(new Race(input2).totalWins);