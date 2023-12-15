let fs = require('fs'), readline = require('readline');
let regX = new RegExp(/(\d+)\s{1}([a-z]+)[;,]?/, 'g');
let test = { red: 12, green: 13, blue: 14 };
let total = 0;
let totalPower = 0;

let reader = readline.createInterface({
  input: fs.createReadStream('input_two.txt')
});

reader.on('line', function (line) {
  let gameNum =  parseInt(line.replace('Game ', '').split(':'));
  let possible = true;
  let gameTest = { red: 0, blue: 0, green: 0 };
  [...line.matchAll(regX)].forEach(m => {
    let key = m[2];
    let count = parseInt(m[1]);
    if (count > test[key]) possible = false;
    if (count > gameTest[key]) gameTest[key] = count;
  })
  if (possible) total+= gameNum;
  let power = gameTest.red * gameTest.green * gameTest.blue;
  if (power == 0) console.log('ERR');
  totalPower += power;
});
  
reader.on('close', function () {
  console.log(total);
  console.log(totalPower);
});

