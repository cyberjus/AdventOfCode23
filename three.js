let fs = require('fs'), readline = require('readline');
let charGrid = [];
let valGrid = [];
let symbolMap = [];
let gearMap = [];
let lineCount = 0;
let digitRegX = new RegExp(/\d+/, 'g');
let charRegX = new RegExp(/[^0-9\.]/, 'g');
let gearRegX = new RegExp(/[\*]/, 'g');

let reader = readline.createInterface({
  input: fs.createReadStream('input_three.txt')
});

reader.on('line', function (line) {
  let charArr = line.split('');
  let valArr = [];
  [...line.matchAll(digitRegX)].forEach(m => {
    let v = m[0];
    let vInt = parseInt(v);
    for (let i=0; i<v.length; i++) {
      valArr[m.index+i] = vInt;
    }
  });
  [...line.matchAll(charRegX)].forEach(m => {
    symbolMap.push( { row: lineCount, col: m.index  });
  });
  [...line.matchAll(gearRegX)].forEach(m => {
    gearMap.push( { row: lineCount, col: m.index  });
  });
  charGrid.push(charArr);
  valGrid.push(valArr);
  lineCount++;
});

reader.on('close', function () {
  
  let total = 0;
  console.log('total symbols ' + symbolMap.length);
  symbolMap.forEach(s => {
    for (let r=-1; r<=1; r++) {
      let vals = [];
      for (let c=-1; c<=1; c++) {
        let val = getGridValue(s.row+r,s.col+c);
        if (!vals.includes(val)) vals.push(val);
      }
      total += vals.reduce((a,c) => (a+c), 0);
    }
  });
  console.log(total);
  let gearTotal = 0;
  console.log('total gears ' + gearMap.length);
  gearMap.forEach(s => {
    let gears = [];
    for (let r=-1; r<=1; r++) {
      for (let c=-1; c<=1; c++) {
        let val = getGridValue(s.row+r,s.col+c);
        if (!gears.includes(val) && val != 0) gears.push(val);
      }
    }
    if (gears.length == 2) {
      gearTotal += gears[0] * gears[1];
    }
  });
  console.log(gearTotal);
});

let getGridValue = function(r, c) {
  if (r < 0 || r > valGrid.length) return 0;
  if (c < 0 || c > valGrid[r].length) return 0;
  return valGrid[r][c] ? valGrid[r][c] : 0;
}

