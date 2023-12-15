let fs = require('fs'), readline = require('readline');
let universe = [];
let galaxies = [];
let expandRows = [];
let expandCols = [];
let row = 0;

let reader = readline.createInterface({
  input: fs.createReadStream('input_eleven.txt')
});

reader.on('line', function (line) {
  universe.push(line.split(''));
  if (line.indexOf('#') == -1) expandRows.push(row);
  row++;
});

reader.on('close', function () {

  expandCols = universe.reduce((a,r) => a.filter(i => (r.reduce((a,c,i) => { if (c !== '#') a.push(i); return a; },[])).includes(i)), [...Array(universe[0].length).keys()]);

  let id = 1;
  universe.forEach((r,y) => {
    r.forEach((c,x) => {
      if (c == '#') {
        galaxies.push({id,y,x})
        id++;
      }
    });
  });

  let expander = 2;

  console.log(calcDistances());

  expander = 1000000;

  console.log(calcDistances());

});

function calcDistances() {
  let distances = [];
  galaxies.forEach((g1, i) => {
    galaxies.slice(i + 1).forEach((g2,n) => {
      distances.push({g1: g1, g2: g2, distance: Math.abs(expand(g1.x, expandCols) - expand(g2.x,expandCols)) + Math.abs(expand(g1.y,expandRows) - expand(g2.y,expandRows))});
    });
  });
  return (distances.reduce((a,c) => a+c.distance,0));
}

function expand(p, expands) {
  let len = expands.filter(e => e<p).length
  return p + (len * expander) - len;
}