class Game {
    constructor(deck) {

    // new stuff start
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen =  document.querySelector("#game-screen");
    this.gameEndScreen =  document.querySelector("#game-end");
    this.warScreen = document.querySelector('.war');
    // new stuff end


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

    // enterWar() {
        
    //     // show the war screen
    //     this.warScreen.style.display = "block";
    //      // hide start screen
    //     this.gameScreen.style.display = "none"; 

    // }



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

    dealCard(){
        let x = this.shuffled.shift()
        console.log(x, "the value of the card")
        return x
    }

    checkWinner(cardMap, card1, card2) {
        if(!card1 && !card2 && !cardMap) {
            return undefined;
        }
        // console.log('map card 1 value',cardMap[card1.split("-")[0]]) 
        // console.log('map card 2 value',cardMap[card2.split("-")[0]]) 

        return cardMap[card1.split("-")[0]] > cardMap[card2.split("-")[0]] ;
    }

    checkEndGame() {
        // end game when cash left is less than min. bet
        if (this.cash < 10) {
            return true;
        }
    }

    
}