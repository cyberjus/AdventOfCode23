let fs = require('fs'), readline = require('readline');
const { start } = require('repl');
let grid = [];
let grid2 = [];
let mainPipe = [];
let directions = { 
  '|': (x,y) => ({ y: y, x: 0, dir: (y === -1) ? 0 : 180, char: '\u2503' }), 
  '-': (x,y) => ({ y: 0, x: x, dir: (x === -1) ? 270 : 90, char: '\u2501' }), 
  'L': (x,y) => ({ y: x, x: y, dir: (y === 1) ? 90 : 0, char: '\u2517' }), 
  'J': (x,y) => ({ y: -x, x: -y, dir: (y === 1) ? 270 : 0, char: '\u251B' }), 
  '7': (x,y) => ({ y: x, x: y, dir: (y === -1) ? 270 : 180, char: '\u2513' }), 
  'F': (x,y) => ({ y: -x, x: -y, dir: (y === -1) ? 90 : 180, char: '\u250F' }),
  'S': (x,y) => ({ y: y, x: 0, dir: 180, char: '\u2503' })
};

let P = '\u2588';
let pipes = ['\u2503', '\u2501', '\u2517', '\u251B', '\u2513', '\u250F' ];

let reader = readline.createInterface({
  input: fs.createReadStream('input_ten.txt')
});

reader.on('line', function (line) {
  grid.push(line.split(''));
  grid2.push(line.split(''));
});

reader.on('close', function () {
  let char = 'S';
  let y = grid.findIndex(y => y.includes(char));
  let x = grid[y].indexOf(char);

  mainPipe = tracePipe({y,x});

  console.log(mainPipe.steps/2);

  mainPipe.pipes.forEach(g => {
    let p = directions[grid[g.y][g.x]](y,x);
    grid2[g.y][g.x] = p.char;
  });
  
  let hitPipe;
  for (let y=0; y<grid.length; y++) {
    hitPipe = false;
    for (let x=0; x<grid[y].length; x++) {
      if (isPipe(grid2[y][x]))  {
        hitPipe = true;
      } else if (grid2[y][x] != ' ' && (!hitPipe || !inPipes({y,x},true))) {
        grid2[y][x] = ' ';
      }
    }
  } 

  for (let y=grid.length-1; y>=0; y--) {
    hitPipe = false;
    for (let x=grid[y].length-1; x>=0; x--) {
      if (isPipe(grid2[y][x]))  {
        hitPipe = true;
      } else if (grid2[y][x] != ' ' && (!hitPipe || !inPipes({y,x},true))) {
        grid2[y][x] = ' ';
      }
    }
  }

  let nests = 0;
  for (let y=0; y<grid.length; y++) {
    for (let x=0; x<grid[y].length; x++) {
      if (!isPipe(grid2[y][x]) && grid2[y][x] != ' ') {
        grid2[y][x] = P;
        nests++;
      }
    }
  }
  console.log(nests);
  
  let output = fs.createWriteStream('output_ten.txt', 'utf8'); 

  grid2.forEach((r) => {
    output.write(r.join('') + '\n');
  });
});

function isPipe(char) {
  return pipes.includes(char);
}

function pipeInside({y,x}) {
   return mainPipe.pipes.find(p => (p.x === x && p.y === y));
}

function inPipes(coords) {

  for (let y=coords.y; y>=0; y--) {
    let char = grid2[y][coords.x];
    if (char == ' ' || y == 0) return false;
    if (isPipe(char)) break;
  }

  for (let y=coords.y; y<grid.length; y++) {
    let char = grid2[y][coords.x];
    if (char == ' ' || y == grid.length-1) return false;
    if (isPipe(char)) break;
  }

  for (let x=coords.x; x>=0; x--) {
    let char = grid2[coords.y][x];
    if (char == ' ' || x == 0) return false;
    if (isPipe(char)) break;
  }

  for (let x=coords.x; x<grid[0].length; x++) {
    let char = grid2[coords.y][x];
    if (char == ' ' || x == grid[0].length-1 ) return false;
    if (isPipe(char)) break;
  }

  for (let y=coords.y; y>=0; y--) {
    let char = grid2[y][coords.x];
    if (isPipe(char)) {
      let pipe = pipeInside({y,x:coords.x});
      if (pipe.inside === -1) return false;
      break;
    }
  }

  for (let y=coords.y; y<grid.length; y++) {
    let char = grid2[y][coords.x];
    if (isPipe(char)) {
      let pipe = pipeInside({y,x:coords.x});
      if (pipe.inside === 1) return false;
      break;
    }
  }

  return true;
}

function tracePipe(coords, startOverride, startAdjust) {

  let {x,y} = coords;
  let steps = 0;
  let pipes = [];
  let yDir, xDir;
  let inside = 1;
  let dir = '180';

  while (!(steps != 0 && x === coords.x && y === coords.y)) {
    char = grid[y][x];
    if (!directions[char]) break;
    let dirAdjust = directions[char](xDir, yDir);
    dir = dirAdjust.dir;
    if (yDir === undefined) {
        yDir = 1;
        xDir = 0;
    } else {
      yDir = dirAdjust.y;
      xDir = dirAdjust.x;
    }
    if (xDir !== 0) inside = xDir;
    pipes.push({y,x,inside});
    y += yDir;
    x += xDir;
    steps++;
  }

  return { pipes, steps };
}
