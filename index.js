// Definições iniciais
const gameArea = document.getElementById('game');
const ball = document.getElementById('ball');
const paddleLeft = document.getElementById('paddle-left');
const paddleRight = document.getElementById('paddle-right');
const scoreLeft = document.getElementById('score-left');
const scoreRight = document.getElementById('score-right');

const gameWidth = gameArea.offsetWidth;
const gameHeight = gameArea.offsetHeight;

let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballVelocityX = 2;
let ballVelocityY = 2;
let paddleLeftY = gameHeight / 2 - paddleLeft.offsetHeight / 2;
let paddleRightY = gameHeight / 2 - paddleRight.offsetHeight / 2;
let leftScore = 0;
let rightScore = 0;

// Atualiza a posição dos paddles
function movePaddles() {
  paddleLeft.style.top = paddleLeftY + 'px';
  paddleRight.style.top = paddleRightY + 'px';
}

// Atualiza a posição da bola
function moveBall() {
  ballX += ballVelocityX;
  ballY += ballVelocityY;

  // Verifica colisão com o topo e fundo
  if (ballY <= 0 || ballY >= gameHeight - ball.offsetHeight) {
    ballVelocityY *= -1;
  }

  // Verifica colisão com os paddles
  if (ballX <= paddleLeft.offsetWidth && ballY >= paddleLeftY && ballY <= paddleLeftY + paddleLeft.offsetHeight) {
    ballVelocityX *= -1;
  }

  if (ballX >= gameWidth - paddleRight.offsetWidth - ball.offsetWidth && ballY >= paddleRightY && ballY <= paddleRightY + paddleRight.offsetHeight) {
    ballVelocityX *= -1;
  }

  // Verifica se a bola saiu da tela
  if (ballX <= 0) {
    rightScore++;
    resetBall();
  } else if (ballX >= gameWidth - ball.offsetWidth) {
    leftScore++;
    resetBall();
  }

  ball.style.left = ballX + 'px';
  ball.style.top = ballY + 'px';

  // Atualiza os scores
  scoreLeft.textContent = leftScore;
  scoreRight.textContent = rightScore;
}

// Reinicia a posição da bola
function resetBall() {
  ballX = gameWidth / 2;
  ballY = gameHeight / 2;
  ballVelocityX = ballVelocityX < 0 ? -2 : 2;
  ballVelocityY = ballVelocityY < 0 ? -2 : 2;
}

// Movimentação dos paddles com as teclas
document.addEventListener('keydown', (e) => {
  // Player 1 (Teclas W e S)
  if (e.key === 'w' && paddleLeftY > 0) {
    paddleLeftY -= 20;
  } else if (e.key === 's' && paddleLeftY < gameHeight - paddleLeft.offsetHeight) {
    paddleLeftY += 20;
  }

  // Player 2 (Teclas ↑ e ↓)
  if (e.key === 'ArrowUp' && paddleRightY > 0) {
    paddleRightY -= 20;
  } else if (e.key === 'ArrowDown' && paddleRightY < gameHeight - paddleRight.offsetHeight) {
    paddleRightY += 20;
  }

  movePaddles();
});

// Função de atualização
function gameLoop() {
  moveBall();
  requestAnimationFrame(gameLoop);
}

gameLoop();