class Game {
    constructor(deck) {
        this.deck = deck;
        this.shuffled;
        // pop the cards already dealt into an array
        this.dealtCards = [];
        this.currentBet = 0;
        this.cash = 100;
        ;
    }

    shuffleDeck() {
        console.log("** shuffleDeck called **")
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

            console.log('in shuffle before re-assign',this.deck)

            this.shuffled = shuffled;

            console.log('in shuffle after re-assign',this.shuffled)

                return this.shuffled;
            }
                
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
        console.log("this.shuffle when dealing", this.shuffled)
        let x = this.shuffled.shift()
        console.log(x, "the value of the card")
        return x
    }

    checkWinner(cardMap, card1, card2) {
        if(!card1 && !card2 && !cardMap) {
            return undefined;
        }
        // console.log('map card 1 value',cardMap[card1.value]) 
        // console.log('map card 2 value',cardMap[card2.value]) 

        return cardMap[card1.value] > cardMap[card2.value] ;

        // if(card1 > card2) {
        //     return card1;
        // } else if (card2 > card1) {
        //     return card2;
        // } return 'draw'
    }

    checkEndGame() {
        // end game when cash left is less than min. bet
        if (this.cash < 10) {
            return true;
        }
    }

    
}