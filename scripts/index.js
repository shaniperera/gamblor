function buildDeck() {
  let values = ["A","2","3", "4", "5", "6", "7","8","9","10","J", "Q", "K"];
  let suits = ["C", "D", "H", "S" ];
  let deck = [];
  for(let i =0 ; i < suits.length; i++) {
    for(let j = 0; j < values.length; j++) {
      deck.push(values[j]+"-"+suits[i])
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
const startButton = document.getElementById("start-button");
const resartButrron = document.getElementById("restart-button");
const game = new Game(buildDeck());
// const newDeck = ["A-S","A-H","A-C","10-D","A-D","A-H","A-C","5-D","A-S","A-H","A-C","A-D","A-S","A-H","4-C","5-D"];
// const game = new Game(newDeck);

startButton.addEventListener("click", function () {
  game.startGame();
})

game.shuffleDeck();

const userBet = document.querySelectorAll('.bet-option'); 
const thisBet = document.querySelector('#current-bet');
const userBank = document.querySelector('#bank');

userBet.forEach(bet => {
  bet.addEventListener("click", event => {
    if(game.isValidBet(event)) {
      thisBet.textContent = game.currentBet;
    }
    else {
      swal("🍩🍩🍩", "Awww.. not enough to bet", '/img/homer-not-enough-donuts.png');
      thisBet.textContent = game.currentBet;      
    }
  })
});

const playButton = document.querySelector('.play');
const result = document.querySelector('.result');
const bettingButtons = document.querySelector('.bet-options')
const playDoubleButtons = document.querySelector('#play-double');
let doubleButton = document.createElement("button");
doubleButton.innerText = 'Double BET & Play';
playDoubleButtons.appendChild(doubleButton);
doubleButton.style.display = "none";

let playerCard;
let dealerCard;

userPlay();

function userPlay() {
  playButton.addEventListener("click", () => {
     // check if bet has been made and is valid
    if(game.currentBet === 0) {
      swal("🍩🍩🍩", "Select a bet first!", "/img/homer-donut.jpeg");
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
  setTimeout(() => {thisBet.textContent = game.currentBet},1500);
  if(result) {
    game.cash = Number(cash) + Number(currentBet);
      } else {
          game.cash = Number(cash) - Number(currentBet);
          game.endGame();

        }
          setTimeout(() => {userBank.innerHTML = game.cash},1500);
          return;
};

function doubleBet(currentBet, currentCash) {
    console.log('in war block cash:', currentCash)
    let doubleBet = 2 * currentBet;
    console.log('previous bet', currentBet)
    console.log("doubleBet:", doubleBet);
    if(currentCash >= doubleBet) {
    game.currentBet = doubleBet;
    console.log("New current Bet:", game.currentBet);
    thisBet.textContent = game.currentBet
    game.renderCard();
  } 
  else {
    swal("😔", "You don't have enough 🍩 to double your bet.", "/img/homer-donut.jpeg");
  }
  return;
}

resartButrron.addEventListener("click", function () {
    location.reload()
  });


// todo: Steps:
// 1. Load the game screen
// 2. Get user bet amount option (min. = 10)- 
//     a. if bet < bank, show msg
//     b. if bet >= bank, update bet amout
// 3. Deal 2 cards from the deck
// 4. Check which dealt card wins: ++/ -- bank accordingly
// 5. If draw, show 'war' option: double original bet OR forfeit 0.5 of bet
//     a. if bank >= 2X bet, allow 'war'
//     b. else decrease bank by 0.5 of original bet

// 6. Check endGame () 
//     a. if true, show restart game
// sound on win or lose round
// animation for words you won x amount
// flip CanvasCaptureMediaStreamTrackget rid of images
// intro and end screens
