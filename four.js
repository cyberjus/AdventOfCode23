let fs = require('fs'), readline = require('readline');
let totalScore = 0;
let winnersCount = [];
let originalCount = 0;

let reader = readline.createInterface({
  input: fs.createReadStream('input_four.txt')
});

reader.on('line', function (line) {
  let card = line.split('|');
  let gameNum =  parseInt(card[0].substring(5,8));
  let winningNumbers = card[0].substring(10).split(/\s+/);
  winningNumbers.pop();
  let myNumbers = card[1].split(/\s+/);
  myNumbers.shift();
  let winners = myNumbers.filter(n => winningNumbers.includes(n));
  winnersCount.push(winners.length);
  totalScore += winners.length == 0 ? 0 : 1 * ( 2 ** (winners.length-1));;
  originalCount++;
});

reader.on('close', function () {
  console.log(totalScore);
  console.log(addWinners(winnersCount,0)+originalCount);
});

let addWinners = function(winners, i) {
  count = 0;
  winners.forEach((w) => {
    count += parseInt(w);
    let copies = winnersCount.slice(i+1,i+1+parseInt(w));
    count += addWinners(copies, i+1);
    i++;
  });

  return count;
}
