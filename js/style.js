
   
class Game {
    constructor() {
        this.status = 0;
        this.clics = 0;
        this.cards = this.initCards();
        this.playedCards = [];
        this.restartBtn = document.querySelector("#restartbtn");
    }

    startGame() {
    }

    endGame() {
       
        this.showResetButton();
    }

    showResetButton(){
        
    }

    play(cardIndex) {
        if(this.clics == 0){
            this.startGame();
        }
        this.clics++;
        this.cards[cardIndex].turn();
        this.playedCards.push(this.cards[cardIndex]);

        this.cards.forEach((card, i) => {
            let cardDiv =  document.querySelector(`.card[data-index = "${i}"]`);
            if(card.state == 1){
                   cardDiv.classList.add('visible')
            }else{
               cardDiv.classList.remove('visible')
            }
        });
        this.checkPair();



        }


    checkPair(){
        if (this.playedCards.length < 2) {
            return;
        }
        if (this.playedCards[0].value == this.playedCards[1].value) {
            this.checkWin();
        }else{
            this.playedCards[0].turn();
            this.playedCards[1].turn();

            setTimeout(() => {

                this.cards.forEach((card, i) => {
                    let cardDiv =  document.querySelector(`.card[data-index = "${i}"]`);
                    if(card.state == 1){
                           cardDiv.classList.add('visible')
                    }else{
                       cardDiv.classList.remove('visible')
                    }
                });
            }, 1000);
        }
        this.playedCards = [];

    }

    checkWin() {
        if(this.cards.every(card => card.state == 1)) {
            this.endGame();
        }
    }

    initCards() {
        let cards = [new Card("💎"),new Card("💎"),new Card("🐾"),new Card("🐾"),new Card("🎱"),new Card("🎱"),new Card("🍌"),new Card("🍌"),new Card("💗"),new Card("💗"),new Card("🍦"),new Card("🍦"),new Card("🦓"),new Card("🦓"),new Card("🃏"),new Card("🃏"),new Card("🛬"),new Card("🛬"),new Card("🛫"),new Card("🛫")];
        shuffle(cards)
        let div = document.querySelector('#game')
        for (let i = 0; i < cards.length; i++) {
            const element = cards[i];
            let cardDiv = document.createElement("div")
            let newContent = document.createTextNode(element.value);
            cardDiv.setAttribute('data-index', i);
            cardDiv.classList.add('card');
            cardDiv.appendChild(newContent);
            div.appendChild(cardDiv)
        }
          div.addEventListener("click",e => {
              this.play(e.target.dataset.index)
          })
        return cards;

    }

    reset() {
     location.reload();
    }
    
    RestartGame() {
    this.restartBtn.addEventListener('click',()=>{
    this.reset();
    })  
       
    }
}

class Card {
    constructor(value) {
        this.value = value;
        this.state = 0;
    }

    turn(){
        if (this.state == 0) {
            this.state = 1
        }else if (this.state == 1){
            this.state = 0
        }

    }
}


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

let game = new Game();
game.RestartGame();


