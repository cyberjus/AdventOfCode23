let fs = require('fs'), readline = require('readline');

let functions = [];
let s = false;
let accepted = [];

let reader = readline.createInterface({
  input: fs.createReadStream('input_nineteen.txt')
});

reader.on('line', function (line) {
  if (line.trim() === '') {
    s = true;
  } else if (!s) {
    functions[line.substring(0, line.indexOf("{"))] = new Func(line.substring(line.indexOf("{")+1, line.length-1)); 
  } else {
    let input = line.replaceAll('=',':').replace('x', '"x"').replace('m', '"m"').replace('a', '"a"').replace('s', '"s"');
    let xmas = JSON.parse(input);
    let next = 'in';
    //let path = [];
    while (next != 'R' && next != 'A') {
     next = functions[next].run(xmas); 
    }
    if (next === 'A') accepted.push(xmas);

  }
});

reader.on('close', function () {
 console.log(accepted.reduce((a,c) => a + c.x + c.m + c.a + c.s, 0));
});

class Func {

  tests = [];
  final;

  constructor(f) {
    let fs = f.split(',');
    for (let i=0; i<fs.length-1; i++) {
      let ts = fs[i].split(':');
      this.tests.push({ test: ts[0], result: ts[1] });
    }
    this.final = fs[fs.length-1];
  }

  run(xmas) {
    let {x,m,a,s} = xmas;
    for (let i=0; i<this.tests.length; i++) {
      if (eval(this.tests[i].test)) return this.tests[i].result;
    }
    return this.final;
  }
}


/*let str = "a<2006:qkq,m>2090:A,rfg"

let f = new Func(str);

console.log(f.tests);


let input = '{x=787,m=1655,a=1222,s=2876}';
input = input.replaceAll('=',':').replace('x', '"x"').replace('m', '"m"').replace('a', '"a"').replace('s', '"s"');
let xmas = JSON.parse(input);

f.run(xmas);*/

