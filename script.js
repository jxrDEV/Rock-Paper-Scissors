let computer = ['rock', 'paper', 'scissors'];

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

  let resultElement = document.querySelector('.js-results');
  resultElement.innerHTML = result;

  let movesElement = document.querySelector('.js-moves');
  movesElement.innerHTML = `You ${playerMove} - ${randomComputer} Computer`;

}

function updateScoreElement() {
  let scoreElement = document.querySelector('.js-score');
  scoreElement.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

