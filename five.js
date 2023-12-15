let fs = require('fs');
let input = fs.readFileSync('input_five.txt').toString().split(':');
let seeds = input[1].split(/\r?\n/)[0].split(' ');
seeds.shift();

let maps = [];
for (let i=2; i<input.length; i++) {
  let lines = input[i].split(/\r?\n/);
  let map = { ranges: [] };
  lines.filter(l => l.split(' ').length==3).forEach(l => {
    let lVals = l.split(' ');
    map.ranges.push({ destination: parseInt(lVals[0]) , source: parseInt(lVals[1]) , sourceLength: parseInt(lVals[2]) });
  });
  maps.push(map);
}

let locations = [];

// Part 1
seeds.forEach(s => {
  let index = parseInt(s);
  maps.forEach(m => {
    index = parseMap(index, m);
  });
  locations.push(index);
});
console.log(Math.min(...locations));

// Part 2
maps.reverse();

for (let i=0; i<=Math.min(...locations); i++) {
  //let i = 30000000;
  let index = i;
  maps.forEach(m => {
    index = parseMapReverse(index, m);
  });
  if (i % 10000000 === 0) console.log('checking ' + i);
  for (let n=0; n<seeds.length; n+=2) {
    let seedStart = parseInt(seeds[n]);
    let range = parseInt(seeds[n+1]);
    if (index >= seedStart && index <= (seedStart + range)) {
      console.log(i);
      i = 100000000000000;
      break;
    }
  }
}

function parseMap(input, map) {
  let range = map.ranges.find(r => {
    return (input >= r.source && (r.source + r.sourceLength) > input)
  });
  if (!range) return input
  return (input - range.source + range.destination);
}

function parseMapReverse(input, map) {
  let range = map.ranges.find(r => {
    return (input >= r.destination && (r.destination + r.sourceLength) > input)
  });
  if (!range) return input
  return (input - range.destination + range.source);
}