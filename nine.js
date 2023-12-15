let fs = require('fs'), readline = require('readline');
let datasets = [];
let ends = [];
let starts = [];

let reader = readline.createInterface({
  input: fs.createReadStream('input_nine.txt')
});

reader.on('line', function (line) {

  let dataset = line.split(' ').map(d => parseInt(d));
  datasets.push(dataset);

  let diffs = setDiff(dataset);
  ends.push(diffs.end);
  starts.push(diffs.start);
  
});

reader.on('close', function () {

  console.log(ends.reduce((a,c) => a+c,0));
  console.log(starts.reduce((a,c) => a+c,0));

});

function setDiff(dataset) {
  
  let differenceSet = [];
  differenceSet.push(dataset);
  let allZero = false;

  while (!dataset.every(d => d===0)) {
    let diffs = [];
    for (let i=0; i<dataset.length-1; i++) {
      diff = dataset[i+1]-dataset[i];
      diffs.push(diff);
    }
    differenceSet.push(diffs);
    dataset = diffs;
  }

  differenceSet.reverse();

  let end = 0;
  let start = 0;
  for (let i=1; i<differenceSet.length; i++) {
    end = differenceSet[i].pop() + end;
    start = differenceSet[i].shift() - start;
  }
  return { end: end, start: start };
} 