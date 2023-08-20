const deck = [
  { value: '2', suit: '♥️' },
  { value: '2', suit: '♦️' },
  { value: '2', suit: '♠️' },
  { value: '2', suit: '♣️' },
  { value: '3', suit: '♥️' },
  { value: '3', suit: '♦️' },
  { value: '3', suit: '♠️' },
  { value: '3', suit: '♣️' },
  { value: '4', suit: '♥️' },
  { value: '4', suit: '♦️' },
  { value: '4', suit: '♠️' },
  { value: '4', suit: '♣️' },
  { value: '5', suit: '♣️' },
  { value: '5', suit: '♥️' },
  { value: '5', suit: '♦️' },
  { value: '5', suit: '♠️' },
  { value: '6', suit: '♣️' },
  { value: '6', suit: '♥️' },
  { value: '6', suit: '♦️' },
  { value: '6', suit: '♠️' },
  { value: '7', suit: '♣️' },
  { value: '7', suit: '♥️' },
  { value: '7', suit: '♦️' },
  { value: '7', suit: '♠️' },
  { value: '8', suit: '♣️' },
  { value: '8', suit: '♥️' },
  { value: '8', suit: '♦️' },
  { value: '8', suit: '♠️' },
  { value: '9', suit: '♣️' },
  { value: '9', suit: '♥️' },
  { value: '9', suit: '♦️' },
  { value: '9', suit: '♠️' },
  { value: '10', suit: '♣️' },
  { value: '10', suit: '♥️' },
  { value: '10', suit: '♦️' },
  { value: '10', suit: '♠️' },
  { value: 'J', suit: '♣️' },
  { value: 'J', suit: '♥️' },
  { value: 'J', suit: '♦️' },
  { value: 'J', suit: '♠️' },
  { value: 'Q', suit: '♣️' },
  { value: 'Q', suit: '♥️' },
  { value: 'Q', suit: '♦️' },
  { value: 'Q', suit: '♠️' },
  { value: 'K', suit: '♣️' },
  { value: 'K', suit: '♥️' },
  { value: 'K', suit: '♦️' },
  { value: 'K', suit: '♠️' },
  { value: 'A', suit: '♣️' },
  { value: 'A', suit: '♥️' },
  { value: 'A', suit: '♦️' },
  { value: 'A', suit: '♠️' },
];

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
game.shuffleDeck();
console.log('in game shuffled deck: ', game.deck);

const userBet = document.querySelectorAll('.bet-option'); 
const thisBet = document.querySelector('#current-bet');


userBet.forEach(bet => {
  bet.addEventListener("click", event => {

    if(game.isValidBet(event)) {
      console.log("Ready to Play")
      thisBet.textContent = game.currentBet;
      console.log('Display the bet:',thisBet.innerHTML);
      // todo: show game screen/ hide or disable betting buttons(?)
    }
    else {
      console.log('No go 😭');
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
})

const userPlay = document.querySelector('.play');
const result = document.querySelector('.result');
let playerCard;
let dealerCard;

 userPlay.addEventListener("click", () => {
  if(game.currentBet === 0) {
    //todo show prompt to select valid bet first to play
    console.log('Must bet first')
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
    }
  
    if(game.checkWinner(playerCard, dealerCard)) {
      result.textContent = 'Player Wins 🍩'
      console.log('winner player: cards are:', playerCard, dealerCard);
    } 
      else if (game.checkWinner(dealerCard,playerCard)) {
      result.textContent = 'Casino Wins 😫'
      console.log('winner dealer: cards are:', dealerCard,playerCard);
    }
     else {
      console.log('draw')
     }
  
 });

  // goToWar();

// Steps:
// 1. Load the game screen
// 2. Get user bet amount option (min. = 10)- 
//     a. if bet < bank, show msg
//     b. if bet >= bank, update bet amout
// 3. Deal 2 cards from the deck
// 4. Check which dealt card wis: ++/ -- bank accordingly
// 5. If draw, show 'war' option: double original bet OR forfeit 0.5 of bet
//     a. if bank >= 2X bet, allow 'war'
//     b. else decrease bank by 0.5 of original bet
// 6. Check endGame () 
//     a. if true, show restart game

