class Game {
    constructor(deck) {
    this.startScreen = document.querySelector("#game-intro");
    this.gameEndScreen =  document.querySelector("#game-end");
    this.gameContainer =  document.querySelector("#game-container");
    this.deck = deck;
    this.shuffled = [];
    this.dealtCards = [];
    this.currentBet = 0;
    this.cash = 100;
    }

    startGame() {
        // hide start screen
        this.startScreen.style.display = "none"; 
        this.gameEndScreen.style.display = "none";
        // show the game screen
        this.gameContainer.style.display = "block";      
    }

    shuffleDeck() {
        if(!this.deck) {
            return undefined;
        } 
            else {
            let shuffled = this.deck
            //put each element in array in an object + give it a random sort key 
            .map(card => ({ card, sort: Math.random() }))
            // sort using the random key asc.
            .sort((a, b) => a.sort - b.sort)
            // unmap to get the original objects
            .map(({ card }) => card);
            this.shuffled = shuffled;
        }
        return this.shuffled;        
    }
    
    dealCard() {
        return this.shuffled.shift()
    }

 renderCard() {
  // deal the player card and push to dealt cards array
  let cardImgPlayer = document.createElement("img");
  playerCard = game.dealCard();
  cardImgPlayer.src = "/img/" + playerCard + ".png";
// target.parentNode.insertBefore(elem, target.nextSibling)

    setTimeout(() => {
    document.querySelector(".player-card #hidden").replaceWith(cardImgPlayer)
  }, "350");
    game.dealtCards.push(playerCard);

  // deal the dealer card and push to dealt cardsarray
  let cardImgDealer = document.createElement("img");
  dealerCard = game.dealCard();
  cardImgDealer.src = "/img/" + dealerCard + ".png";

    setTimeout(() => {
      document.querySelector(".dealer-card #hidden").replaceWith(cardImgDealer)
    }, "500");
    game.dealtCards.push(dealerCard);

    if(game.dealtCards.length === 52) {
      game.deck= game.dealtCards;
      console.log(game.shuffleDeck());
    }
    game.checkWinner(cardMap, playerCard, dealerCard); 
    return;
}
    
    isValidBet(event) {
            let isValidBet = false;
            if(this.cash >= event.target.innerHTML) {
                // set current bet to user clicked value
                this.currentBet = event.target.innerHTML;
                isValidBet = true;
            }
                else {
                    this.currentBet = 0;
                    isValidBet = false;
                }
                    return isValidBet;  
        }

    checkWinner(cardMap, card1, card2) {
        if(!card1 && !card2 && !cardMap) {
            return undefined;
        }
        let playerCardValue =  cardMap[card1.split("-")[0]];
        let dealerCardValue =  cardMap[card2.split("-")[0]];

        bettingButtons.style.display = "flex";
        doubleButton.style.display = "none";

        if(playerCardValue > dealerCardValue) {   
            let winImage = document.createElement("img")
            winImage.src = "/img/homer-woohoo.gif";
            console.log('PLAYER wins -> cards are:', playerCard, dealerCard);
            setTimeout(() => {result.append(winImage)},1000);
            setTimeout(() => {winImage.style.display = 'none'},2500);
            updatBank(true, game.cash, game.currentBet);
            } else if (dealerCardValue > playerCardValue) 
                {
                    let loseImage = document.createElement("img")
                    loseImage.src = "/img/homer-doh.gif";
                    console.log('DEALER wins - cards are:', playerCard,dealerCard);
                    setTimeout(() => {result.append(loseImage)},1000);
                    setTimeout(() => {loseImage.style.display = 'none'},2500);
                    updatBank(false, game.cash, game.currentBet);
                }
                else {
                    console.log('Draw! cards are:',playerCard, dealerCard);
 
                     setTimeout(() => {swal("It's a DRAW!", "DOUBLE your bet to win big on th next round or PLAY with current bet.", "/img/homer-donut.jpeg")},1000);

                    doubleButton.addEventListener("click", () => {
                    doubleBet(game.currentBet, game.cash);
                    });

                    bettingButtons.style.display = "none";
                    doubleButton.style.display = "block";
            }
        return;
    }

    endGame() {
    if (game.cash < 10) {
        swal("🍩🍩🍩", "You don't have enough the min. 10 🍩 to keep playing","/img/end-game.png ");
        // end game when less than min. bet
        this.gameEndScreen.style.display = "block";
        this.gameContainer.style.display = "none";
        }      
    }
    
}
