let fs = require('fs'), readline = require('readline');
let grid = [];
let grid2 = [];
let directions = { 
  '|': (x,y,dir) => {
    if (dir.x != 0) {
      return [
        { y: y-1, x: x, dir: { x: 0, y: -1 }  },
        { y: y+1, x: x, dir: { x: 0, y: 1 }  }
      ]
    }
    return [{ y: y+dir.y, x: x, dir: { x: dir.x, y: dir.y } }]
  }, 
  '-': (x,y,dir) => {
    if (dir.y != 0) {
      return [
        { y: y, x: x-1, dir: { x: -1, y: 0 }  },
        { y: y, x: x+1, dir: { x: 1, y: 0 }  }
      ]
    }
    return [{ y: y, x: x+dir.x, dir: { x: dir.x, y: dir.y } }]
  }, 
  '\\': (x,y,dir) => {
    return [{ y: y+dir.x, x: x+dir.y, dir: { x: dir.y, y: dir.x } }]
  }, 
  '/': (x,y,dir) => {
    return [{ y: y-dir.x, x: x-dir.y, dir: { x: -dir.y, y: -dir.x } }]
  },
  '.': (x,y,dir) => {
    return [{ y: y+dir.y, x: x+dir.x, dir: { x: dir.x, y: dir.y } }]
  }
};
let reader = readline.createInterface({
  input: fs.createReadStream('input_sixteen.txt')
});

reader.on('line', function (line) {
  grid.push(line.split(''));
  grid2.push(line.split('').map(x => '.'));
});

reader.on('close', function () {

  let coords =  { y: 0, x: 0, dir: { x: 1, y: 0 }  };

  energizeGrid(coords);

  console.log(grid2.reduce((a,c) => a + c.filter((c) => c !== '.').length,0));

  let output = fs.createWriteStream('output_sixteen.txt', 'utf8'); 

  grid2.forEach((r) => {
    output.write(r.join('') + '\n');
  });

});

function energizeGrid(c) {

  let char;  
  //console.log('new group')
  
  while ((c.x >= 0 && c.y >= 0 && c.x < grid[0].length && c.y < grid.length)) {
    char = grid[c.y][c.x];
    //console.log(char);
    //console.log(c);
    let grid2Char = char;
    if (char === '.') {
      if (c.dir.y === -1) grid2Char = 'V';
      if (c.dir.y === 1) grid2Char = 'V';
      if (c.dir.x === -1) grid2Char = '<';
      if (c.dir.x === 1) grid2Char = '>';
    } 
    let ex = grid2[c.y][c.x];
    //console.log(grid2Char);
    if (char === '.' && (ex === grid2Char)) {
      //console.log('beam loop');
      break;
    } 
    if (char == '.' && ex !== '.') grid2Char = '2';
    grid2[c.y][c.x] = grid2Char;
    let dir = directions[char](c.x,c.y,c.dir);
    if (dir.length == 2) {
      //console.log('split')
      energizeGrid(dir[1]);
    }
    c = dir[0];
  }

  //console.log('done loop')
}
