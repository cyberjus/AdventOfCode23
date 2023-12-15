let fs = require('fs'), readline = require('readline');
let platform = [];

let reader = readline.createInterface({
  input: fs.createReadStream('input_fourteen.txt')
});

reader.on('line', function (line) {
  platform.push(line.split(''));
});

reader.on('close', function () {

  let p = platform;
  transpose(reverse(p));
  p = shiftRocks(p)
  console.log(weighRocks(p));

  let first;
  let loop;
  let results = [];

  for (let n = 0; n < 1000000000; n++) {
    for (let i = 0; i < 4; i++) {
      if (!(n==0 && i==0)) p = shiftRocks(p);
      reverse(transpose(p));
    }

    results.push(p);
    if (n == 100) {
      first = p;
    } else if (first && compareArrays(first, p)) {
      loop = n-100;
      let loopStep = (1000000000-100) % loop;
      n = 1000000000-loopStep;
    } 
  }
  console.log(weighRocks(p));
});

function compareArrays(oldA, newA) {
  return (JSON.stringify(oldA) === JSON.stringify(newA));
}

function reverse(arr) {
  return arr.map(row => row.reverse());
}

function transpose(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < i; j++) {
      const temp = arr[i][j];
      arr[i][j] = arr[j][i];
      arr[j][i] = temp;
    }
  }
  return arr;
}

function shiftRocks(arr) {
  let rtn = [];
  for (i = 0; i < arr.length; i++) {
    let y = arr[i].join('').split('#');
    let newLine = [];
    for (let n = 0; n < y.length; n++) {
      newLine.push(y[n].split('').sort().reverse().join(''));
    }
    rtn.push(newLine.join('#').split(''));
  }
  return rtn;
}

function weighRocks(arr) {
  return arr.reduce((a,r) => a + r.reduce((a,c,i) => a + ((c=='O') ? r.length-i : 0),0),0);
}