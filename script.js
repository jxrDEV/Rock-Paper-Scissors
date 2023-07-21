let computer = ['rock', 'paper', 'scissors'];
const modalWin = document.querySelector('.modal-win');
const modalLose = document.querySelector('.modal-lose');
let score = JSON.parse(localStorage.getItem('score'));

let randomNumber = Math.floor(Math.random() * 3);
let randomComputer = computer[randomNumber];

if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  }
}

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

document.querySelector('.js-autoplay-button')
  .addEventListener('click', () => {
    autoPlay();
  });

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      if (score.wins === 5 || score.losses === 5) {
        clearInterval(intervalId);
        isAutoPlaying = false;
      } else {
        let playerMove = computer[randomNumber];
        playGame(playerMove);
      }
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper')
  } else if (event.key === 's') {
    playGame('scissors')
  }
});

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
  <p class="player-icon" >Player</p>
  <img class="move-icon" src="/images/${playerMove}.jpg" >
</div>
<div>
  <p class="js-results results-icon"></p>
</div>
<div>
  <p class="computer-icon">Computer</p>
  <img class="move-icon" src="/images/${randomComputer}.jpg" >
</div>`;


  let resultElement = document.querySelector('.js-results');
  resultElement.innerHTML = result;

  if (score.wins === 5) {
    modalWin.showModal();
    restartGameWin();
  } else if (score.losses === 5) {
    modalLose.showModal();
    restartGameLose();
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

document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
    resetScore();
  });

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

function restartGameWin() {
  const closeModalWin = document.querySelector('.js-play-again-win');
  closeModalWin.addEventListener('click', () => {
    modalWin.close();
    resetScore();
  })
}

function restartGameLose() {
  const closeModalLose = document.querySelector('.js-play-again-lose');
  closeModalLose.addEventListener('click', () => {
    modalLose.close();
    resetScore();
  })
}