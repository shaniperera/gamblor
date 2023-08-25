function buildDeck() {
  let values = ["A", "2", "3", "4",
    "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  let suits = ["C", "D", "H", "S"];
  let deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + "-" + suits[i])
    }
  }
  return deck;
}
// object literal that maps card values
const cardMap = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  "J": 11,
  "Q": 12,
  "K": 13,
  "A": 14,
}
const game = new Game(buildDeck());

const startButton = document.getElementById("start-button");
const resartButton = document.getElementById("restart-button");
const userBet = document.querySelectorAll('.bet-option');
const thisBet = document.querySelector('#current-bet');
const userBank = document.querySelector('#bank');
const playButton = document.querySelector('.play');
const result = document.querySelector('.result');
const bettingButtons = document.querySelector('.bet-options')
const playDoubleButtons = document.querySelector('#play-double');
let doubleButton = document.createElement("button");

startButton.addEventListener("click", function () {
  game.startGame();
})

game.shuffleDeck();

userBet.forEach(bet => {
  bet.addEventListener("click", event => {
    //get the user clicked button and call isValidBet function
    if (game.isValidBet(event)) {
      thisBet.textContent = game.currentBet;
    }
    else {
      swal("🍩🍩🍩", "Awww.. not enough to bet, choose a smaller amount", './assets/img/homer-not-enough-donuts.png');
      thisBet.textContent = game.currentBet;
    }
  })
});

doubleButton.innerText = 'Double BET & Play';
playDoubleButtons.appendChild(doubleButton);
doubleButton.style.display = "none";

let playerCard;
let dealerCard;

userPlay();

function userPlay() {
  playButton.addEventListener
    ("click", () => {
      // check if bet has been made and is valid
      if (game.currentBet === 0) {
        swal("🍩🍩🍩", "Select a bet first!", "./assets/img/homer-donut.jpeg");
      }
      else {
        game.renderCard();
      }
    });
  return;
}
// takes result of checkWinner and updates the bank accordingly
function updatBank(result, cash, currentBet) {
  game.currentBet = 0;
  setTimeout(() => { thisBet.textContent = game.currentBet }, 1500);
  if (result) {
    game.cash = Number(cash) + Number(currentBet);
    setTimeout(() => { userBank.style.color = 'green' }, 1500);
    game.endGame();

  } else if (!result) {
    game.cash = Number(cash) - Number(currentBet);
    game.endGame();
    setTimeout(() => { userBank.style.color = 'red' }, 1500);
  }
  setTimeout(() => { userBank.innerHTML = game.cash }, 1500);
  return;
};

function doubleBet(currentBet, currentCash) {
  let doubleBet = 2 * currentBet;
  // check if user can double their bet
  if (currentCash >= doubleBet) {
    game.currentBet = doubleBet;
    thisBet.textContent = game.currentBet
    game.renderCard();
  }
  else {
    swal("😔", "You don't have enough 🍩 to double your bet.", "./assets/img/homer-donut.jpeg");
  }
  return;
}

resartButton.addEventListener("click", function () {
  // re-load URL
  location.reload()
});