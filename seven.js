let fs = require('fs'), readline = require('readline');
let hands = [];
let cardOrder = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
let jokers = false;

let reader = readline.createInterface({
  input: fs.createReadStream('input_seven.txt')
});

reader.on('line', function (line) {
  let l = line.split(' ');
  hands.push({ cards: l[0].split(''), bid: parseInt(l[1]) });
});

reader.on('close', function () {
  hands.sort(compareHands);
  console.log(hands.reduce((a,c,i) => a + (c.bid * (i+1)),0));

  jokers = true;
  cardOrder.splice(3,1).push('J');

  hands.sort(compareHands);
  console.log(hands.reduce((a,c,i) => a + (c.bid * (i+1)),0));
});

function compareHands(a, b) {
  let rankA = rankHand(a), rankB = rankHand(b);
  if (rankA === rankB) {
    for (let c=0; c<5; c++) {
      if (a.cards[c] != b.cards[c]) {
        return cardOrder.indexOf(b.cards[c]) - cardOrder.indexOf(a.cards[c]);
      }
    }
  }
  return rankA-rankB;
}

function rankHand(hand) {
  let cardCounts = hand.cards.reduce((acc, val) => {
    acc[val] === undefined ? acc[val] = 1 : acc[val]++;
    return acc
  }, {});
  let addCount = 0;
  if (jokers && cardCounts['J'] && cardCounts['J'] != 5) {
    addCount = cardCounts['J'];
    delete cardCounts['J'];
  }
  let totals = Object.values(cardCounts).sort().reverse();
  totals[0] += addCount;
  if (totals[0] === 3 && totals[1] === 2) return 3.5;
  if (totals[0] === 2 && totals[1] === 2) return 2.5;
  return totals[0];
}