class Game {
    constructor(deck) {
        this.deck = deck;
        // pop the cards already dealt into an array
        this.dealtCards = [];
        this.bet = bet;
        this.cash = 100;
        this.shuffleDeck();
    }

    shuffleDeck() {
        if(!this.deck) {
            return undefined;
        } else {
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
    checkWinner(card1, card2) {
        if(card1 > card2) {
            return card1;
        } else if (card2 > card1) {
            return card2;
        } return 'draw'
    }
    checkEndGame() {
        if (this.cash === 0) {
            return true;
        }
    }
}