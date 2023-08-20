class Game {
    constructor(deck) {
        this.deck = deck;
        // pop the cards already dealt into an array
        this.dealtCards = [];
        this.currentBet = 0;
        this.cash = 90;
        // this.shuffleDeck();
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
            this.deck = shuffled;
            }
                return this.deck;
    }
    isValidBet(event) {
            let isValidBet = false;
            if(this.cash >= event.target.innerHTML) {
                this.currentBet = event.target.innerHTML;
                // set current bet to user clicked value
                isValidBet = true;
            }
                else {
                    this.currentBet = 0;
                    isValidBet = false;
                }
                    return isValidBet;  
        }

    dealCard(){
        return this.deck.shift()
    }

    checkWinner(card1, card2) {
        if(!card1 && !card2) {
            return undefined;
        }
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
        if (this.cash === 0) {
            return true;
        }
    }

    
}