// ====== Select elements ======
const gameContainer = document.getElementById("game-container");
const startBtn = document.getElementById("startbtn");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

// ====== Game variables ======
let colors = [
  "red", "blue", "green", "yellow",
  "purple", "orange", "pink", "cyan"
]; // 8 colors -> 16 cards (pairs)
let cards = [];
let flippedCards = [];
let matchedCount = 0;
let score = 0;
let timer = 30;
let timerInterval;

// ====== Shuffle helper ======
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// ====== Create cards ======
function createCards() {
  gameContainer.innerHTML = "";
  const colorPairs = [...colors, ...colors]; // duplicate for pairs
  shuffle(colorPairs);

  colorPairs.forEach((color) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.color = color;
    card.addEventListener("click", flipCard);
    gameContainer.appendChild(card);
  });

  cards = document.querySelectorAll(".card");
}

// ====== Flip card logic ======
function flipCard() {
  // prevent clicking more than 2 or clicking same card twice
  if (flippedCards.length === 2 || this.classList.contains("matched") || flippedCards.includes(this)) {
    return;
  }

  this.style.backgroundColor = this.dataset.color;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

// ====== Check for match ======
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.color === card2.dataset.color) {
    // match found
    card1.classList.add("matched");
    card2.classList.add("matched");
    score += 10;
    matchedCount++;
    flippedCards = [];

    if (matchedCount === colors.length) {
      endGame(true);
    }
  } else {
    // not a match
    setTimeout(() => {
      card1.style.backgroundColor = "#ddd";
      card2.style.backgroundColor = "#ddd";
      flippedCards = [];
    }, 600);
  }

  scoreDisplay.textContent = `Score: ${score}`;
}

// ====== Start game ======
function startGame() {
  clearInterval(timerInterval);
  score = 0;
  matchedCount = 0;
  timer = 30;
  scoreDisplay.textContent = "Score: 0";
  timerDisplay.textContent = "Time Left: 30";
  flippedCards = [];

  createCards();

  cards.forEach((card) => (card.style.backgroundColor = "#ddd"));

  timerInterval = setInterval(() => {
    timer--;
    timerDisplay.textContent = `Time Left: ${timer}`;
    if (timer <= 0) {
      endGame(false);
    }
  }, 1000);
}

// ====== End game ======
function endGame(won) {
  clearInterval(timerInterval);
  const message = won
    ? `🎉 You Won! Final Score: ${score}`
    : `⏰ Time’s Up! Final Score: ${score}`;
  alert(message);
}

// ====== Event listeners ======
startBtn.addEventListener("click", startGame);
