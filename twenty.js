let fs = require('fs'), readline = require('readline');

let modules = [];

let reader = readline.createInterface({
  input: fs.createReadStream('input_twenty.txt')
});

reader.on('line', function (line) {
  let l = line.split(' -> ');
  let name = l[0].replace('%', '').replace('&', '');
  modules[name] = new Module(l[0].substring(0,1), l[1]);
});

reader.on('close', function () {

  // append sources
  Object.keys(modules).forEach(k => {
    modules[k].destinations.forEach(d => {
      if (modules[d] !== undefined && modules[d].type === '&') {
        modules[d].sources[k] = 0;
      }
    });
  });

  let lowCount = 0;
  let highCount = 0;
  let i = 0;

  for (i=0; i<1000; i++) {
    let buttonResult = pushButton();
    lowCount += buttonResult.lowCount;
    highCount += buttonResult.highCount;
  }

  console.log(lowCount * highCount);

  //Object.keys(modules).forEach(k => modules[k].reset());

  while (i>0) {
    let buttonResult = pushButton();
    if (i % 100000000 === 0) console.log('running => ' + i);
    if (buttonResult.results.some(r => r.pulse === 0)) {
      console.log('found => ' + i);
      break;
    }
    //if (buttonResult.results.length === 1 && buttonResult.results[0].module === 'rx' && buttonResult.results[0].pulse === 0) {
    //  break;
    //}  
    i++;
  }
  console.log(i);

});

function pushButton() {
  let lowCount = 0;
  let highCount = 0;
  let queue = [{ pulse: 0, destination: 'broadcaster', source: 'button' }];
  let results = [];
  while (queue.length > 0) {
    let next = queue.shift();
    //console.log(next.source + ' -' + next.pulse + '-> '  + next.destination);
    if (next.pulse == 0) lowCount++;
    if (next.pulse == 1) highCount++;

    if (modules[next.destination] == undefined) {
      results.push({ module: next.destination, pulse: next.pulse });
      continue;
    }
    let result = modules[next.destination].input(next.pulse, next.source);
    if (result) {
        result.destinations.forEach(destination => {
        queue.push({ pulse: result.pulse, destination, source: next.destination })
      });
    }
  }
  return { lowCount, highCount, results };
}

class Module {

  type;
  state = 0;
  sources = [];
  destinations;

  constructor(type, destinations) {
    this.type = type;
    this.destinations = destinations.split(',').map(d => d.trim());
  }

  reset() {
    this.state = 0;
    (Object.values(this.sources).forEach(s => s = 0));
  }

  input(pulse, source) {
    if (this.type === '%') {
      if (pulse === 0) {
        this.state = (this.state === 0) ? 1 : 0;
        return { pulse: this.state, destinations: this.destinations };
      } 
      return;
    } else if (this.type === '&') {
      this.sources[source] = pulse;
      this.state = (Object.values(this.sources).every(s => s === 1)) ? 0 : 1;
      return { pulse: this.state, destinations: this.destinations };
    } else {
      return { pulse, destinations: this.destinations };
    }
  }

}