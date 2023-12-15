let fs = require('fs'), readline = require('readline');
let lineCount = 0;
let directions = [];
let coords = [];
let starts = [];

let reader = readline.createInterface({
  input: fs.createReadStream('input_eight.txt')
});

reader.on('line', function (line) {
  if (lineCount == 0) {
    directions = line.split(''); 
  } else if (lineCount != 1) {
    let l = line.match(/([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})\)/);
    if (l[1].substring(2) === 'A') starts.push(l[1]);
    coords[l[1]] = { left: l[2], right: l[3] };
  }
  lineCount++;
});

reader.on('close', function () {
  
  let steps = pathNav('AAA')
  .then(steps => console.log('step 1: ' + steps));

  let step2 = starts.map(s => pathNav(s));
  Promise.all(step2).then(steps => {
    console.log('step 2 ' + lcm(steps, steps.length));
  });
});

let pathNav = function (loc) {
  return new Promise(function(resolve, reject) {
    let n = 0;
    let steps = 0;
    lastChar = loc.substring(2);
    while (lastChar != 'Z') {
      if (n >= directions.length) n = 0;
      let dir = directions[n];
      let next = coords[loc];
      loc = (dir == 'L') ? next.left : next.right;
      lastChar = loc.substring(2);
      n++;
      steps++;
    }
    resolve(steps);
  });
}

function lcm(arr, n) { 
    let ans = arr[0]; 
    for (let i = 1; i < n; i++) {
      ans = (((arr[i] * ans)) / (gcd(arr[i], ans))); 
    }
    return ans; 
} 

function gcd(a, b) { 
    if (b == 0) 
        return a; 
    return gcd(b, a % b); 
} 

