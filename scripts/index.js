// const deck = [
//   { value: '2', suit: '♥️' },
//   { value: '2', suit: '♦️' },
//   { value: '2', suit: '♠️' },
//   { value: '2', suit: '♣️' },
//   { value: '3', suit: '♥️' },
//   { value: '3', suit: '♦️' },
//   { value: '3', suit: '♠️' },
//   { value: '3', suit: '♣️' },
//   { value: '4', suit: '♥️' },
//   { value: '4', suit: '♦️' },
//   { value: '4', suit: '♠️' },
//   { value: '4', suit: '♣️' },
//   { value: '5', suit: '♣️' },
//   { value: '5', suit: '♥️' },
//   { value: '5', suit: '♦️' },
//   { value: '5', suit: '♠️' },
//   { value: '6', suit: '♣️' },
//   { value: '6', suit: '♥️' },
//   { value: '6', suit: '♦️' },
//   { value: '6', suit: '♠️' },
//   { value: '7', suit: '♣️' },
//   { value: '7', suit: '♥️' },
//   { value: '7', suit: '♦️' },
//   { value: '7', suit: '♠️' },
//   { value: '8', suit: '♣️' },
//   { value: '8', suit: '♥️' },
//   { value: '8', suit: '♦️' },
//   { value: '8', suit: '♠️' },
//   { value: '9', suit: '♣️' },
//   { value: '9', suit: '♥️' },
//   { value: '9', suit: '♦️' },
//   { value: '9', suit: '♠️' },
//   { value: '10', suit: '♣️' },
//   { value: '10', suit: '♥️' },
//   { value: '10', suit: '♦️' },
//   { value: '10', suit: '♠️' },
//   { value: 'J', suit: '♣️' },
//   { value: 'J', suit: '♥️' },
//   { value: 'J', suit: '♦️' },
//   { value: 'J', suit: '♠️' },
//   { value: 'Q', suit: '♣️' },
//   { value: 'Q', suit: '♥️' },
//   { value: 'Q', suit: '♦️' },
//   { value: 'Q', suit: '♠️' },
//   { value: 'K', suit: '♣️' },
//   { value: 'K', suit: '♥️' },
//   { value: 'K', suit: '♦️' },
//   { value: 'K', suit: '♠️' },
//   { value: 'A', suit: '♣️' },
//   { value: 'A', suit: '♥️' },
//   { value: 'A', suit: '♦️' },
//   { value: 'A', suit: '♠️' },
// ];

const deck = [
  { value: '2', suit: '♥️' },
  { value: '2', suit: '♦️' },
  { value: '2', suit: '♠️' },
  { value: '2', suit: '♣️' },
  { value: '2', suit: '♥️' },
  { value: '2', suit: '♦️' },
  { value: '2', suit: '♠️' },
  { value: '2', suit: '♣️' },
  { value: '2', suit: '♥️' },
  { value: '2', suit: '♦️' },
  { value: '2', suit: '♠️' },
  { value: '2', suit: '♣️' },
]
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

const game = new Game(deck);
// game.shuffleDeck();
console.log('in game shuffled deck: ',game.shuffleDeck());

const userBet = document.querySelectorAll('.bet-option'); 
const thisBet = document.querySelector('#current-bet');
const userBank = document.querySelector('#bank');

// console.log('Global scope type of "game.cash":', typeof game.cash); // number
// console.log('Global scope type of "game.currentBet":', typeof game.currentBet); // number

userBet.forEach(bet => {
  bet.addEventListener("click", event => {
    
    if(game.isValidBet(event)) {
      // console.log('In 1st ifStatement scope type of "game.currentBet":', typeof game.currentBet, game.currentBet); // string
      console.log("Ready to Play")
      thisBet.textContent = game.currentBet;

      // console.log('Display the bet to user:',thisBet.innerHTML);
      // todo: show game screen/ hide or disable betting buttons(?)
    }
    else {
      console.log('Not enough cash 😭');
      thisBet.textContent = game.currentBet;
      // todo: Show error prompt "Not enought cash to bet"
    }
    // original 
    // if(game.cash >= event.target.innerHTML) {
    //   console.log("Play")
    //   console.log(game.dealCard());
    //   game.currentBet=event.target.innerHTML;
    //   thisBet.textContent=game.currentBet;
    
    // }
    //   else 
    //     console.log('No go 😭');
      })
});

const playButton = document.querySelector('.play');
const result = document.querySelector('.result');
let playerCard;
let dealerCard;

userPlay();

function userPlay() {
  playButton.addEventListener("click", () => {
     // check if bet has been made and is valid
    if(game.currentBet === 0) {
      //todo show prompt to select valid bet first to play
      console.log('Must BET first')
    } 
      else {
      console.log('**** in plaaaayyyyyy ****')
      // deal the player card and push to dealt cards array
      playerCard = game.dealCard();
      game.dealtCards.push(playerCard);
      // deal the dealer card and push to dealt cardsarray
      dealerCard = game.dealCard();
      game.dealtCards.push(dealerCard);
      // console.log(game.dealtCards);
      console.log('dealt cards', game.dealtCards);
  
          if(game.checkWinner(cardMap, playerCard, dealerCard)) {
              result.textContent = 'Player Wins 🍩';
              console.log('winner: Player. cards are:', playerCard, dealerCard);
              //todo set the game.cash amount to current value + currentBet value
              // console.log('In 2nd ifStatment type of "game.cash":', typeof game.cash);
              // console.log('In 2nd ifStatment type of "game.currentBet":', typeof game.currentBet);
              updatBank(true, game.cash, game.currentBet);
          } 
              else if (game.checkWinner(cardMap, dealerCard,playerCard)) {
                result.textContent = 'Casino Wins 😫'
                console.log('winner: Dealer. cards are:', dealerCard,playerCard);
                //todo set the game.cash amount to current value minus currentBet value
                updatBank(false, game.cash, game.currentBet);
            }
                else {
                  //todo: show overlay for "War" or "Forfeit"
                  result.textContent = 'War or Forfiet?';
                  console.log('Draw- cards are:',playerCard, dealerCard);
                  //todo: on overlay, add listener to "war" to call gotToWar
                  forfeit(game.currentBet);
                }
      }
  
   });
   return;
 }
 // takes result of checkWinner and updates the bank accordingly
function updatBank(result, cash, currentBet) {
  game.currentBet = 0;
  thisBet.textContent = game.currentBet;
  if(result) {
    game.cash = Number(cash) + Number(currentBet);
      } else {
          game.cash = Number(cash) - Number(currentBet);
        }
          userBank.innerHTML = game.cash;
          return;
};

function gotToWar(bet, cash) {
  // calc. the war bet (2 x currentBet)
  let wager = 2 * bet;
  console.log(" Wager:", wager);
  // check if enough cash to place wager
  if(cash >= wager) {
    //set the current bet to the wager
    game.currentBet = wager;
    // todo: block other betting
    console.log("New current Bet:", game.currentBet);
    thisBet.textContent = game.currentBet
    // console.log('You can go to war');
    // game.currentBet = 0;

  }
  else {
    // todo: show error msg is War clicked when not enough cash
    console.log("Not enough cash. You must forfeit half your bet")
  }
  return;
}
function forfeit(bet) {
  // reduce cash by half of original bet
    game.cash -= bet * 0.5;
    userBank.innerHTML = game.cash;
    console.log("New bank", game.cash);
    game.currentBet = 0;
    thisBet.textContent = game.currentBet
    console.log('You have decided to forfeit');
  return;
}


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

