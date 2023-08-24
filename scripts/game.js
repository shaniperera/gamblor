class Game {
    constructor(deck) {
        this.startScreen = document.querySelector("#game-intro");
        this.gameEndScreen = document.querySelector("#game-end");
        this.gameContainer = document.querySelector("#game-container");
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
        if (!this.deck) {
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
        cardImgPlayer.src = "./assets/img/" + playerCard + ".png";
        cardImgPlayer.id = "player-hidden";
        cardImgPlayer.style.transform = 'rotate(-5deg)';
        setTimeout(() => {
            document.querySelector("#player-hidden").replaceWith(cardImgPlayer)
        }, 300);
        game.dealtCards.push(playerCard);

        // deal the dealer card and push to dealt cardsarray
        let cardImgDealer = document.createElement("img");
        dealerCard = game.dealCard();
        cardImgDealer.src = "./assets/img/" + dealerCard + ".png";
        cardImgDealer.id = "dealer-hidden"
        cardImgDealer.style.transform = 'rotate(5deg)';

        setTimeout(() => {
            document.querySelector("#dealer-hidden").replaceWith(cardImgDealer)
        }, 800);
        game.dealtCards.push(dealerCard);

        if (game.dealtCards.length === 52) {
            game.deck = game.dealtCards;
            console.log(game.shuffleDeck());
        }
        game.checkWinner(cardMap, playerCard, dealerCard);
        return;
    }

    isValidBet(event) {
        let isValidBet = false;
        if (this.cash >= event.target.innerHTML) {
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
        if (!card1 && !card2 && !cardMap) {
            return undefined;
        }
        let playerCardValue = cardMap[card1.split("-")[0]];
        let dealerCardValue = cardMap[card2.split("-")[0]];

        bettingButtons.style.display = "flex";
        doubleButton.style.display = "none";

        if (playerCardValue > dealerCardValue) {
            let winImage = document.createElement("img")
            winImage.src = "./assets/img/homer-wins2.gif";

            setTimeout(() => { result.append(winImage) }, 1000);
            setTimeout(() => { winImage.style.display = 'none' }, 2500);
            let winAudio = new Audio("./assets/homer-woohoo.mp3");
            setTimeout(function () { winAudio.play(); }, 1000)

            updatBank(true, game.cash, game.currentBet);

        } else if (dealerCardValue > playerCardValue) {
            let loseImage = document.createElement("img")
            loseImage.src = "./assets/img/homer-dooooh.gif";
            setTimeout(() => { result.append(loseImage) }, 1000);
            setTimeout(() => { loseImage.style.display = 'none' }, 2500);
            let loseAudio = new Audio("./assets/doh.mp3");
            setTimeout(() => { loseImage.style.display = 'none' }, 2500);
            setTimeout(function () { loseAudio.play(); }, 1000)

            updatBank(false, game.cash, game.currentBet);
        }
        else {
            setTimeout(() => { swal("It's a DRAW!", "DOUBLE your bet to win big on the next round or PLAY with current bet.", "./assets/img/burns-sexy.jpg") }, 900);

            doubleButton.addEventListener("click", () => {
                doubleBet(game.currentBet, game.cash);
            });

            bettingButtons.style.display = "none";
            doubleButton.style.display = "block";
        }
        return;
    }

    endGame() {
        if (game.cash === 0) {
            swal("🙀", "You lost all your donuts to the casino. PLAY AGAIN?", "./assets/img/burns-excellent.gif");
            // end game when less than min. bet
            this.gameEndScreen.style.display = "block";
            this.gameContainer.style.display = "none";
        } else if (game.cash >= 500) {
            swal("🥳", "You won!! Press START to play again!", "./assets/img/homer-woohoo.gif");
            this.gameEndScreen.style.display = "none";
            this.startScreen.style.display = "block";
        }

    }

}
