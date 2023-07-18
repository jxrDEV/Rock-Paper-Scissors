let computer = ['rock', 'paper', 'scissors'];
const modal = document.querySelector('.modal');
let score = JSON.parse(localStorage.getItem('score'));

if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  }
}

updateScoreElement();

function playGame(playerMove) {
  let randomNumber = Math.floor(Math.random() * 3);
  let randomComputer = computer[randomNumber];
  let result = '';

  if (playerMove === 'rock') {
    if (randomComputer === 'rock') {
      score.ties++
      result = 'Tie.'
    } else if (randomComputer === 'paper') {
      score.losses++
      result = 'You lose.'
    } else if (randomComputer === 'scissors') {
      score.wins++
      result = 'You win.'
    }

  } else if (playerMove === 'paper') {
    if (randomComputer === 'rock') {
      score.wins++
      result = 'You win.'
    } else if (randomComputer === 'paper') {
      score.ties++
      result = 'Tie.'
    } else if (randomComputer === 'scissors') {
      score.losses++
      result = 'You lose.'
    }

  } else if (playerMove === 'scissors') {
    if (randomComputer === 'rock') {
      score.losses++
      result = 'You lose.'
    } else if (randomComputer === 'scissors') {
      score.ties++
      result = 'Tie.'
    } else if (randomComputer === 'paper') {
      score.wins++
      result = 'You win.'
    }
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  let playerMoveElement = document.querySelector('.js-player-move');
  playerMoveElement.innerHTML = `<div>
  <img class="move-icon" src="/images/${playerMove}.jpg" >
</div>
<div>
  <p class="js-results results-icon"></p>
</div>
<div>
  <img class="move-icon" src="/images/${randomComputer}.jpg" >
</div>`;


  let resultElement = document.querySelector('.js-results');
  resultElement.innerHTML = result;

  if (score.wins === 5) {
    modal.showModal();
    restartGame();
  } else if (score.losses === 5) {
    modal.showModal();
    restartGame();
  }
}

function updateScoreElement() {
  let playerScoreElement = document.querySelector('.js-player-score');
  playerScoreElement.innerHTML = `${score.wins}`;

  let computerScoreElement = document.querySelector('.js-computer-score');
  computerScoreElement.innerHTML = `${score.losses}`;

  let tieScoreElement = document.querySelector('.js-tie-score');
  tieScoreElement.innerHTML = `${score.ties}`;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

function restartGame() {
  const closeModal = document.querySelector('.js-play-again');
  closeModal.addEventListener('click', () => {
    modal.close();
    resetScore();
  })
}

