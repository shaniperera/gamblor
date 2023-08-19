const deck = [
  { name: '2', suit: '♥️' },
  { name: '2', suit: '♦️' },
  { name: '2', suit: '♠️' },
  { name: '2', suit: '♣️' },
  { name: '3', suit: '♥️' },
  { name: '3', suit: '♦️' },
  { name: '3', suit: '♠️' },
  { name: '3', suit: '♣️' },
  { name: '4', img: 'fantastic-four1.jpg' },
  { name: '4', img: 'fantastic-four2.jpg' },
  { name: '4', img: 'fantastic-four3.jpg' },
  { name: '4', img: 'fantastic-four4.jpg' },
  { name: '5', img: 'flash1.jpg' },
  { name: '5', img: 'flash2.jpg' },
  { name: '5', img: 'flash3.jpg' },
  { name: '5', img: 'flash4.jpg' },
  { name: '6', img: 'green-arrow1.jpg' },
  { name: '6', img: 'green-arrow2.jpg' },
  { name: '6', img: 'green-arrow3.jpg' },
  { name: '6', img: 'green-arrow4.jpg' },
  { name: '7', img: 'green-lantern1.jpg' },
  { name: '7', img: 'green-lantern2.jpg' },
  { name: '7', img: 'green-lantern3.jpg' },
  { name: '7', img: 'green-lantern4.jpg' },
  { name: '8', img: 'ironman1.jpg' },
  { name: '8', img: 'ironman2.jpg' },
  { name: '8', img: 'ironman3.jpg' },
  { name: '8', img: 'ironman4.jpg' },
  { name: '9', img: 'spiderman1.jpg' },
  { name: '9', img: 'spiderman2.jpg' },
  { name: '9', img: 'spiderman3.jpg' },
  { name: '9', img: 'spiderman4.jpg' },
  { name: '10', img: 'superman1.jpg' },
  { name: '10', img: 'superman2.jpg' },
  { name: '10', img: 'superman3.jpg' },
  { name: '10', img: 'superman4.jpg' },
  { name: 'Jack', img: 'the-avengers1.jpg' },
  { name: 'Jack', img: 'the-avengers2.jpg' },
  { name: 'Jack', img: 'the-avengers3.jpg' },
  { name: 'Jack', img: 'the-avengers4.jpg' },
  { name: 'Queen', img: 'thor1.jpg' },
  { name: 'Queen', img: 'thor2.jpg' },
  { name: 'Queen', img: 'thor3.jpg' },
  { name: 'Queen', img: 'thor4.jpg' },
  { name: 'King', img: 'abc1.jpg' },
  { name: 'King', img: 'abc2.jpg' },
  { name: 'King', img: 'abc3.jpg' },
  { name: 'King', img: 'abc4.jpg' },
  { name: 'Ace', img: 'aquaman1.jpg' },
  { name: 'Ace', img: 'aquaman2.jpg' },
  { name: 'Ace', img: 'aquaman3.jpg' },
  { name: 'Ace', img: 'aquaman4.jpg' },
];

const game = new Game(deck);
game.shuffleDeck();
console.log('in game', game.deck);

const userBet = document.querySelectorAll('.bet-option'); 
const thisBet = document.querySelector('#current-bet');


userBet.forEach(bet => {
  bet.addEventListener("click", event => {

    if(game.isValidBet(event)) {
      console.log("Play")
      thisBet.textContent = game.currentBet;
      // show game screen
    }
    else {
      console.log('No go 😭');
      // Show error  screen
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


//deal player card and push to dealt cards
game.dealCard.push(game.dealCard());

// deal dealer card and push to dealt cards
game.dealCard.push(game.dealCard());

if(game.dealtCards.length === 2) {
  
}


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

