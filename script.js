const FRONT = "cardFront";
const BACK = "cardBack";
const CARD = "card";
const ICON = "icon";

let option = 0;

function inicio(m){ 
  option = m;
  alert('começa')
  startGame()
}

function startGame() {
  alert('começa')
  if(option == 1){
    initializeCardsOne(game.createCardsFromTechs(1));
  }else if (option == 2){
    initializeCardsTwo(game.createCardsFromTechs(2));
  }else{
    initializeCardsThree(game.createCardsFromTechs(3));
  }
}

function initializeCardsThree(cards) {
  
  let gameBoardThree = document.getElementById("gameBoardThree");
  gameBoardThree.innerHTML = '';
  game.cards.forEach((card) => {
  
  let cardElement = document.createElement("div");
  cardElement.id = card.id;
  cardElement.classList.add(CARD);
  cardElement.dataset.icon = card.icon;
  createCardContent(card, cardElement);

  cardElement.addEventListener("click", flipCard);
  gameBoardThree.appendChild(cardElement);
  });
}

function initializeCardsOne(cards) {
  
  let gameBoardOne = document.getElementById("gameBoardOne");
  gameBoardOne.innerHTML = '';
  game.cards.forEach((card) => {
  
  let cardElement = document.createElement("div");
  cardElement.id = card.id;
  cardElement.classList.add(CARD);
  cardElement.dataset.icon = card.icon;
  createCardContent(card, cardElement);

  cardElement.addEventListener("click", flipCard);
  gameBoardOne.appendChild(cardElement);
  });
}

function initializeCardsTwo(cards){
  let gameBoardTwo = document.getElementById("gameBoardTwo");
  gameBoardTwo.innerHTML = "";

  game.cards.forEach((card) => {
    
    let cardElement = document.createElement("div");
    cardElement.id = card.id;
    cardElement.classList.add(CARD);
    cardElement.dataset.icon = card.icon;
    createCardContent(card, cardElement);

    cardElement.addEventListener("click", flipCard);
    gameBoardTwo.appendChild(cardElement);

  });
}

function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {
  let cardElementFace = document.createElement("div");
  cardElementFace.classList.add(face);
  if (face === FRONT) {
    let iconElement = document.createElement("img");
    iconElement.classList.add(ICON);
    iconElement.src = "./image/" + card.icon + ".png";
    cardElementFace.appendChild(iconElement);
    
    
  } else {
    cardElementFace.innerHTML = "?";
  }
  element.appendChild(cardElementFace);
}

function flipCard() {
  if (game.setCard(this.id)) {
    //cada movimento de carta
    var audio = new Audio('move.mp3');
    audio.play();
    this.classList.add("flip");
    if (game.secondCard) {
      if (game.checkMatch()) {
        game.clearCards();
        //acerta combinacao
        var audio = new Audio('acertou.mp3');
        audio.play();
        if (game.checkGameOver()) {
          let gameOverLayer = document.getElementById("gameOver");
          gameOverLayer.style.display = "flex";
        }
      } else {
        //erra a combinacao
        var audio = new Audio('errou.mp3');
        audio.play();
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id);
          let secondCardView = document.getElementById(game.secondCard.id);
          firstCardView.classList.remove("flip");
          secondCardView.classList.remove("flip");
          game.unflipCards();
        }, 1000);
      }
    }
  }
}

var val = 60;
var time;

function timePlay() {
  time = Number(val);
  setTimeout("contador()", 1000);
}

function contador() {
  time = time - 1;
  if (time == -1) {
    return alert("O tempo acabou");
  }

  tempo.innerText = time;
  setTimeout("contador()", 1000);
}

function restart() {
  game.clearCards();
  startGame();
  let gameOverLayer = document.getElementById("gameOver");
  gameOverLayer.style.display = "none";
}

function voltar(){
  window.location.assign('nivelS.html');
}