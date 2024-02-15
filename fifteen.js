let fs = require('fs'), readline = require('readline');
let sequence = [];

let reader = readline.createInterface({
  input: fs.createReadStream('input_fifteen.txt')
});

reader.on('line', function (line) {
  sequence = sequence.concat(line.split(','));
});

reader.on('close', function () {

  let total = 0;
  let boxes = [];

  sequence.forEach(s => {
    
    total += runHashmap(s);

    let code2 = s.split(/[=-]/);
    let label = code2[0];
    let box = runHashmap(label);

    if (s.indexOf('=') !== -1) {
      let focal = code2[1];
      let lens = {label,focal};
      if (!boxes[box]) {
        boxes[box] = [lens];
      } else {
        let i = boxes[box].findIndex(l => l.label == label);
        if (i !== -1) {
          boxes[box][i] = lens;
        } else {
          boxes[box].push(lens);
        }
      }
    } else if (boxes[box]) {
      boxes[box] = boxes[box].filter(l => (l.label !== label));
    }
  });
  console.log(total);

  let total2 = 0;
  boxes.forEach((b,bi) => {
    b.forEach((l,li) => {
      total2 += (bi+1) * (li+1) * l.focal;
    });
  })
  console.log(total2);

});


function runHashmap(s) {
  let code = 0;
  for (let i = 0; i < s.length; i++) {
    code += s.charCodeAt(i);
    code *= 17;
    code %= 256;
  }
  return code;
}

