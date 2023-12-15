let fs = require('fs'), readline = require('readline');
let valArr = [];
let numerals = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
let numberalRev = numerals.map(n => n.split('').reverse().join(''));

let reader = readline.createInterface({
  input: fs.createReadStream('input_one.txt')
});

reader.on('line', function (line) {
  digits = extractDigit(line, numerals) + extractDigit(line.split('').reverse().join(''), numberalRev);
  valArr.push(digits);
});

reader.on('close', function () {
  let total = valArr.reduce((a, c) => a + parseInt(c), 0);
  console.log(total);
});

let extractDigit = function (str, numArray) {
  let regX = new RegExp('\\d{1}|' + numArray.join('|'));
  let find = str.match(regX)[0];
  return /\d/.test(find) ? find : numArray.indexOf(find) + 1 + '';
}



