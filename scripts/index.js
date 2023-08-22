const startButton = document.getElementById("start-button");
// const game = new Game(buildDeck());
const newDeck = ["A-S","A-H","A-C","A-D"];
const game = new Game(newDeck);
console.log(newDeck);
startButton.addEventListener("click", function () {
  game.startGame();
})

function buildDeck() {
  let values = ["A","2","3", "4", "5", "6", "7","8","9","10","J", "Q", "K"];
  let suits = ["C", "D", "H", "S" ];
  let deck = [];
  for(let i =0 ; i < suits.length; i++) {
    for(let j = 0; j<values.length; j++) {
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

console.log(game.shuffleDeck());

const userBet = document.querySelectorAll('.bet-option'); 
const thisBet = document.querySelector('#current-bet');
const userBank = document.querySelector('#bank');

userBet.forEach(bet => {
  bet.addEventListener("click", event => {
    
    if(game.isValidBet(event)) {
      thisBet.textContent = game.currentBet;
      // todo: show game screen/ hide or disable betting buttons(?)
    }
    else {
      swal("😫", "You don't have enough donuts to play 🍩");
      thisBet.textContent = game.currentBet;      
    }
      })
});

const playButton = document.querySelector('.play');
const result = document.querySelector('.result');
const bettingButtons = document.querySelector('.bet-options')
const warForfeitButtons = document.querySelector('#play-forfeit-war')
let playerCard;
let dealerCard;

userPlay();

function userPlay() {
  playButton.addEventListener("click", () => {
     // check if bet has been made and is valid
    if(game.currentBet === 0) {
      //todo show prompt to select valid bet first to play
      swal("🍩🍩🍩🍩🍩", "Select a bet first!", "/img/homer-donut.jpeg");
    } 
      else {
      // deal the player card and push to dealt cards array
      let cardImgPlayer = document.createElement("img");
      playerCard = game.dealCard();
      cardImgPlayer.src = "/img/" + playerCard + ".png";

       setTimeout(() => {
        document.querySelector(".player-card").replaceChildren(cardImgPlayer)
      }, "400");
      game.dealtCards.push(playerCard);

      // deal the dealer card and push to dealt cardsarray
      let cardImgDealer = document.createElement("img");
      dealerCard = game.dealCard();
      cardImgDealer.src = "/img/" + dealerCard + ".png";

      setTimeout(() => {
        document.querySelector(".dealer-card").replaceChildren(cardImgDealer)
      }, "800");
      game.dealtCards.push(dealerCard);
  
          if(game.checkWinner(cardMap, playerCard, dealerCard)) {
              let winImage = document.createElement("img")
              winImage.src = "/img/homer-woohoo.gif";
              console.log('winner: Player. cards are:', playerCard, dealerCard);
              setTimeout(() => {result.append(winImage)},1200);
              setTimeout(() => {winImage.style.display = 'none'},2500);
              //todo set the game.cash amount to current value + currentBet value
              updatBank(true, game.cash, game.currentBet);
          } 
              else if (game.checkWinner(cardMap, dealerCard,playerCard)) {
               
              let loseImage = document.createElement("img")
              loseImage.src = "/img/homer-d'oh.gif";
              console.log('winner: Dealer. cards are:', dealerCard,playerCard);
              setTimeout(() => {result.append(loseImage)},1200);
              setTimeout(() => {loseImage.style.display = 'none'},2500);
                
                //todo set the game.cash amount to current value minus currentBet value
                updatBank(false, game.cash, game.currentBet);
            }
                else {
                  //todo: show overlay for "War" or "Forfeit"
                  result.textContent = 'War or Forfiet?';
                  console.log('Draw! cards are:',playerCard, dealerCard);
                  //todo: on overlay, add listener to "war" to call gotToWar
                  // game.enterWar();
                  bettingButtons.style.display = 'none';
                  playButton.disabled =true;
                  swal("🤺", "It's a draw! You can double your bet to take on the casino or forfeit half your bet!", "/img/homer-donut.jpeg");
                  let forfeitButton = document.createElement("button");
                  forfeitButton.innerText = 'Forfeit';
                  let warButton = document.createElement("button");
                  warButton.innerText = 'War';
                  warForfeitButtons.appendChild(warButton);
                  warForfeitButtons.appendChild(forfeitButton);
                  forfeitButton.style.display= 'block';
                  warButton.style.display= 'block';



                }
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
        }
          setTimeout(() => {userBank.innerHTML = game.cash},1500);
          return;
};
              // setTimeout(() => {result.append(loseImage)},1200);


function gotToWar(bet, cash) {
  // calc. the war bet (2 x currentBet)
  let wager = 2 * bet;
  console.log(" Wager:", wager);
  // check if enough cash to place wager
  if(cash >= wager) {
    //set the current bet to the wager
    game.currentBet = wager;
    // todo: block other betting
    // bettingButtons.style.display = 'none';

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
