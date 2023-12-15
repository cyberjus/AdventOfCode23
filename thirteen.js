let fs = require('fs'), readline = require('readline');
let lavaFields = [];
let lava = [];

let reader = readline.createInterface({
  input: fs.createReadStream('input_thirteen.txt')
});

reader.on('line', function (line) {

  if (line.trim() === '') {
    lavaFields.push(lava);
    lava = [];
  } else {
    lava.push(line.split(''));
  }
  
});

reader.on('close', function () {

  let total1 = 0;
  let total2 = 0;
  lavaFields.push(lava);

  for (let x=0; x<lavaFields.length; x++) {

    let lavaH = lavaFields[x];
    let lavaV = lavaH.reduce((prev, next) => next.map((item, i) => (prev[i] || []).concat(next[i])), []);
    
    let mirror = findMirror(lavaH, false);

    if (mirror) {
      total1 += (mirror * 100);
    }

    if (!mirror) {
      let mirror = findMirror(lavaV, false);
      total1 += mirror;
    }

    let mirror2 = findMirror(lavaH, true);

    if (mirror2) {
      total2 += (mirror2 * 100);
    }

    if (!mirror2) {
      mirror2 = findMirror(lavaV, true);
      total2 += mirror2;
    }  
  }

  console.log(total1);
  console.log(total2);

});

function findMirror(arr, checkSmudge) {
  let mirror;
  for (let i=0; i<arr.length-1; i++) {
    if (checkMirror(arr,i,checkSmudge)) return i+1;
  }
  return null;
}

function checkMirror(arr, i, smudge) {

  let up = i, down = i+1;
  let smudgeUsed = !smudge;
  matches = true;
  while (matches && up >= 0 && down < arr.length) {
    if (!smudgeUsed) {
      let matchCount = arr[up].filter((m,i) => m == arr[down][i]);
      matches = matchCount.length >= arr[up].length-1;
      if (matchCount.length == arr[up].length-1) smudgeUsed = true;
    } else {
      matches = (arr[up].toString() === arr[down].toString());
    }
    up--;
    down++;
  }
  if (smudge && !smudgeUsed) matches = false;
  return matches;
}
