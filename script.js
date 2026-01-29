let board = ["","","","","","","","",""];
let currentPlayer = "X";
let gameActive = false;
let mode = "ai";
let xScore = 0, oScore = 0;
let timer = 10, interval;

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const timerText = document.getElementById("timer");

let playerXName = "Player X";
let playerOName = "Computer";

const winPatterns = [
 [0,1,2],[3,4,5],[6,7,8],
 [0,3,6],[1,4,7],[2,5,8],
 [0,4,8],[2,4,6]
];

function startGame() {
  playerXName = document.getElementById("playerX").value || "Player X";
  playerOName = document.getElementById("playerO").value || "Computer";
  document.getElementById("xName").innerText = `${playerXName}: ${xScore}`;
  document.getElementById("oName").innerText = `${playerOName}: ${oScore}`;
  resetGame();
}

function setMode(m) {
  mode = m;
  resetGame();
}

function makeMove(i) {
  if (!gameActive || board[i] !== "") return;

  board[i] = currentPlayer;
  cells[i].innerText = currentPlayer;

  if (checkWin(currentPlayer)) {
    statusText.innerText = `${currentPlayer === "X" ? playerXName : playerOName} Wins 🎉`;
    updateScore();
    gameActive = false;
    clearInterval(interval);
    return;
  }

  if (!board.includes("")) {
    statusText.innerText = "Draw 🤝";
    gameActive = false;
    clearInterval(interval);
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.innerText = `${currentPlayer === "X" ? playerXName : playerOName} Turn`;
  resetTimer();

  if (mode === "ai" && currentPlayer === "O") {
    setTimeout(aiMove, 400);
  }
}

function aiMove() {
  let empty = board.map((v,i)=>v===""?i:null).filter(v=>v!==null);
  let move = empty[Math.floor(Math.random()*empty.length)];
  makeMove(move);
}

function checkWin(p) {
  return winPatterns.some(w => w.every(i => board[i] === p));
}

function updateScore() {
  if (currentPlayer === "X") xScore++;
  else oScore++;
  document.getElementById("xName").innerText = `${playerXName}: ${xScore}`;
  document.getElementById("oName").innerText = `${playerOName}: ${oScore}`;
}

function resetTimer() {
  clearInterval(interval);
  timer = 10;
  timerText.innerText = `⏱️ ${timer}`;
  interval = setInterval(() => {
    timer--;
    timerText.innerText = `⏱️ ${timer}`;
    if (timer === 0) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.innerText = "⏰ Turn skipped!";
      resetTimer();
    }
  },1000);
}

function resetGame() {
  board = ["","","","","","","","",""];
  cells.forEach(c => c.innerText = "");
  currentPlayer = "X";
  gameActive = true;
  statusText.innerText = `${playerXName} Turn`;
  resetTimer();
}

function toggleTheme() {
  document.body.classList.toggle("light");
}