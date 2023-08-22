class Game {
    constructor(deck) {

    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen =  document.querySelector("#game-screen");
    this.gameEndScreen =  document.querySelector("#game-end");
    this.warScreen = document.querySelector('.war');

    this.deck = deck;
    this.shuffled = [];
    // pop the cards already dealt into an array
    this.dealtCards = [];
    this.currentBet = 0;
    this.cash = 100;
    }

    startGame() {
        // hide start screen
        this.startScreen.style.display = "none"; 
        // show the game screen
        this.gameScreen.style.display = "block";
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

    dealCard() {
        return this.shuffled.shift()
    }

    checkWinner(cardMap, card1, card2) {
        if(!card1 && !card2 && !cardMap) {
            return undefined;
        }
        let playerCardValue =  cardMap[card1.split("-")[0]];
        let dealerCardValue =  cardMap[card2.split("-")[0]];

        // console.log('map card 1 value',cardMap[card1.split("-")[0]]) 
        // console.log('map card 2 value',cardMap[card2.split("-")[0]]) 
        // return cardMap[card1.split("-")[0]] > cardMap[card2.split("-")[0]] ;

        if(playerCardValue > dealerCardValue) {
            let winner ;
            let winImage = document.createElement("img")
            winImage.src = "/img/homer-woohoo.gif";
            console.log('PLAYER wins -> cards are:', playerCard, dealerCard);
            setTimeout(() => {result.append(winImage)},1200);
            setTimeout(() => {winImage.style.display = 'none'},2500);
            updatBank(true, game.cash, game.currentBet);
        } 
            else if (dealerCardValue>playerCardValue) {
                let loseImage = document.createElement("img")
                loseImage.src = "/img/homer-d'oh.gif";
                console.log('DEALER wins - cards are:', playerCard,dealerCard);
                setTimeout(() => {result.append(loseImage)},1200);
                setTimeout(() => {loseImage.style.display = 'none'},2500);
                updatBank(false, game.cash, game.currentBet);
            }
                else {
                console.log('Draw! cards are:',playerCard, dealerCard);
                // game.enterWar();
                swal("It's a DRAW!", "DOUBLE your bet to take on the casino or FORFEIT half your bet", "/img/homer-donut.jpeg");
                bettingButtons.style.display = 'none';
                playButton.disabled = true;

                let forfeitButton = document.createElement("button");
                forfeitButton.innerText = 'Forfeit';
                let warButton = document.createElement("button");
                warButton.innerText = 'Double';
                warForfeitButtons.appendChild(warButton);
                warForfeitButtons.appendChild(forfeitButton);
                forfeitButton.style.display= 'block';
                warButton.style.display= 'block';

                warButton.addEventListener("click", () => {
                const  warResult = gotToWar(game.currentBet, game.cash);
                console.log('The war result:',warResult);
                })
                forfeitButton.addEventListener("click", () => {
                forfeitButton(game.currentBet);
                })

            }
          return;
    }

    checkEndGame() {
        // end game when cash left is less than min. bet
        if (this.cash < 10) {
            return true;
        }
    }
}