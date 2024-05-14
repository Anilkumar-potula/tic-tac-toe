const board = document.getElementById('board');
const cells = board.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let winner = null;

const turnMessage = document.getElementById('turnMessage');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popupMessage');
const popupButton = document.getElementById('popupButton');
const resetButton = document.getElementById('resetButton');

function updateTurnMessage() {
  turnMessage.textContent = `Current Turn: Player ${currentPlayer}`;
}

function handleCellClick(event) {
  const cell = event.target;
  const index = parseInt(cell.getAttribute('data-index'));

  if (gameState[index] !== '' || winner !== null) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  if(currentPlayer==='X'){
    cell.style.backgroundColor = "#FB88B4";
  }else if(currentPlayer==='O'){
    cell.style.backgroundColor = "#9195F6";
  }
  

  if (checkWinner()) {
    winner = currentPlayer;
    showPopup(`Player ${winner} wins!`);
  } else if (gameState.every(cell => cell !== '')) {
    showPopup('It\'s a draw!');
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurnMessage();
  }
}

function checkWinner() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return true;
    }
  }

  return false;
}

function showPopup(message) {
  popup.classList.add('active')
  popupMessage.textContent = message;
  popupMessage.style.color = 'white';

}



resetButton.addEventListener('click', function() {
  popup.classList.remove('active')
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  winner = null;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.backgroundColor="lightgray";
    
  });
  updateTurnMessage();
});

updateTurnMessage();
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});
