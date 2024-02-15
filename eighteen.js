let fs = require('fs'), readline = require('readline');

let ranges = [];
let current = {x:101, y:101};
let vertical = -1; // DOWN
//let horizontal = -1; // RIGHT
//let grid = new Array(800).fill(' ').map(() => new Array(800).fill(' '));
//console.log(grid);
//let xRanges = new Array(800).fill([]);
//let last = {x:0, y:0};

let reader = readline.createInterface({
  input: fs.createReadStream('input_eighteen.txt')
});

reader.on('line', function (line) {

  let directions = line.split(' ');
  let dir = directions[0];
  let distance = parseInt(directions[1]);

  console.log(dir + ' ' + distance);

  if (dir == 'R') {
    //for (let i=0; i<=distance; i++) {
      //grid[current.y][current.x+i] = '#';
    //  setX(current.x+i, current.y, 0);
    //}
    horizontal *= -1;
    current.x += distance;
    setX(current.x, current.y, vertical);
    //setX(current.x, current.y, dir);
  } else if (dir == 'U') {
    vertical *= -1;
    for (let i=0; i<=distance; i++) {
      setX(current.x, current.y-i, vertical);
      //grid[current.y-i][current.x] = '#';
    }
    current.y -= distance; 
  } else if (dir == 'D') {
    vertical *= -1;
    for (let i=0; i<=distance; i++) {
      setX(current.x, current.y+i, vertical);
      //grid[current.y+i][current.x] = '#';
    }
    current.y += distance;
  } else if (dir == 'L') {
    //for (let i=0; i<=distance; i++) {
      //grid[current.y][current.x-i] = '#';
      //setX(current.x-i, current.y, 0);
    //}
    horizontal *= -1;
    current.x -= distance;
    setX(current.x, current.y, vertical);
    //setX(current.x, current.y, dir);
  }
  //console.log(total);
  console.log(current);

});

reader.on('close', function () {

  //console.log(ranges);

  let total = 0;

  //let maxX, minX, maxY, minY = 0;


  let keys = Object.keys(ranges);
  for (let k=0; k<keys.length; k++) {

    //if (parseInt())
    let key = keys[k];

    //if (parseInt(key) < minY) minY = parseInt(key);
    //if (parseInt(key) > maxY) maxY = parseInt(key);

  
    let rowTotal = 0;
    let start = null;
    //let min;
    let dir;
    let switchDir = false;

    let debugkey = 153;
    //debugkey = key;

    let rowRange = ranges[key];
    rowRange.sort((a,b) => a.x - b.x);

   // if (key == debugkey) 
    console.log(rowRange);

    for (let i=0; i<rowRange.length; i++) {
      //kTotal += Math.abs(ranges[key][i] - ranges[key][i-1]);
      //total += Math.abs(ranges[key][i] - ranges[key][i-1]);
     

      let v = rowRange[i];
      if (key == debugkey) console.log(v);
      //if (key == debugkey) console.log('max ' + max + ' min ' + min + ' switch ' + switchDir);

      if (start === null) {
        start = v.x;
        dir = v.dir;
      } else if (dir != v.dir || i == rowRange.length-1) {
        rowTotal += Math.abs(start - v.x) + 1;
        if (key == debugkey) console.log('add in ' + (Math.abs(start - v.x) + 1));
        start = null;
        dir = null;
      }


      //console.log(switchDir);
      /*if (max !== null && (v.dir === dir || !switchDir)) {
        if (v.x > max) max = v.x;
        if (v.x < min) min = v.x;
        if (v.dir !== dir) switchDir = true; 
        if (key == debugkey) console.log('max ' + max + ' min ' + min + ' switch ' + switchDir);
      } else {
        if (max !== null) {
          rowTotal += Math.abs(max - min) + 1;
          if (key == debugkey) console.log('add in ' + (Math.abs(max - min) + 1));
        }
        max = v.x;
        min = v.x;
        switchDir = false;
        
        //continue;
      }

      dir = v.dir;*/

      //if (parseInt(ranges[key][i]) < minX) minX = parseInt(ranges[key][i]y);
      //if (parseInt(ranges[key][i]) > maxX) maxX = parseInt(ranges[key][i]);

    }

     console.log(key + ' => ' + rowTotal);

    total += rowTotal;

   
  }




 console.log(total-1);



 //console.log(total);

 /*let output = fs.createWriteStream('output_eightteen.txt', 'utf8'); 

 let total2 = 0;

 grid.forEach((r) => {
   output.write(r.join('') + '\n');




   total2 += rowTotal2;

 });

console.log(total2);*/


});

function setX(x, y, v, h) {
  if (ranges[y] === undefined) ranges[y] = [];


  ranges[y].push({x,v});

 

  //if ((dir == 'L' || dir == 'R')) {
  //  ranges[y].push(newX);
  //setX(current.x, current.y, dir);}

  //ranges[y].length >= 1 && ranges[y].length % 2 == 0 && (

  /*if (dir == 'L' && ranges[y].length > 0) {

    if (ranges[y].length % 2 == 0) {
      
    } else {
      ranges[y].push(x);
      ranges[y].push(x);
    }


    console.log('sideways');
    let last = ranges[y].pop();
    console.log(ranges[y]);
    if ((dir == 'L' && last < newX) || (dir == 'R' && last > newX)) {
      console.log('change range ' + y);
      console.log(last + ' -> ' + newX);
      newX = last
     }
 
  } else if (dir == 'R' && ranges[y].length > 0)  {

    if (ranges[y].length > 1 && ranges[y].length % 2 == 0) {
      
    } else {
      ranges[y].push(x);
      ranges[y].push(x);
    }
  

  } else {
    
  //}*/
}