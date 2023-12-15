let fs = require('fs'), readline = require('readline');
let options = [];

let reader = readline.createInterface({
  input: fs.createReadStream('input_twelve.txt')
});

reader.on('line', function (line) {

  let l = line.split(' ');
  let springMap1 = l[0].split('?');
  let key1 = l[1].split(',');
  let springMap = [];
  let key = [];
  for (let i=0; i<5; i++) {
    springMap = springMap.concat(springMap1);
    key = key.concat(key1);
  }
  console.log(springMap);
  console.log(key);
  let symbols = ['.', '#'];

  let regX = new RegExp('^\\.*'+key.map(k => '#{'+k+'}').join('\\.+')+'\\.*$');

  let combinations = [];
  let start = [];
  start.push(springMap[0]);
  combinations.push(start);

  for (let i = 1; i < springMap.length; i++) {
    let newCombos = [];
    for (let s = 0; s < symbols.length; s++) {
      for (let c = 0; c < combinations.length; c++) {
        newCombos.push(combinations[c].concat(symbols[s] + springMap[i]));
      } 
    }
    combinations = newCombos;
  }

  let valid = 0;
  combinations.forEach(c => {
    if (regX.test(c.join(''))) valid++;
  });

  options.push(valid);
});

reader.on('close', function () {
  console.log(options.reduce((a,c) => a+c,0));
});
