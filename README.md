# "Gamblor!!"

[Link to deloyed project](https://shaniperera.github.io/gamblor/)

# Description
"Gamblor!!" is a single player 'casino' style card game where the user makes bets to win 'donuts'.
Starting with 100 donuts, the game involves betting against the casino to win. Two cards are dealt, one to the player and one to the 'dealer'- the highest card wins. If 500 donuts are won, the player wins the game. If all donuts are lost, the player loses the game.

# MVP
Start screen
Game screen
End screen
Win logic
Lose logic
Able to double bet when there is a draw
# Backlog
* Allow user to forfeit a bet in the case of a draw
* Card flip animations
* Responsive stying

# Data structures
####  Class: Game 
Class Methods:
* startGame( )
* huffleDeck( )
* dealCard( )
* renderCard( )
* isValidBet( )
* checkWinner( )
* endGame( ) 
#### Other methods:
* buildDeck( )
* userPlay( )
* updatBank( )
* doubleBet( )
# States
* Start screen: User is given instructions on the aim and rules of the game
* Game screen: User is in the game round, cards are dealt and score is updated according to win/lose logic
* End screen: User is presented the end screen if they have an end score of 0
# Tasks
1. Load the game screen
2. Get user bet amount option (min. = 10, max. = 100):
* a. if bet < bank, show 'invalid' bet msg
* b. if bet >= bank, update bet amount
3. Deal 2 cards from the deck
4. Check which dealt card wins: ++/ -- bank accordingly
5. If draw, option to: double original bet OR play with original bet
*  a. if bank >= 2X bet, allow double option
6. Check endGame( ) 
* a. if true, show end screen with restart game button
7. Intro and end screens 
8. Sound on win or lose in round
9. Animation for 'you won' + 'you won x amount'
10. Card flip animation
# Links
* [Slides Link](https://docs.google.com/presentation/d/1taLnPZYatGFSjbO5v-bIh7SmizoZDczZlY_8KXO1FWU/edit?usp=sharing)
* [GitHub repo link](https://github.com/shaniperera/gamblor)
* [Deployment Link](https://shaniperera.github.io/gamblor/)

