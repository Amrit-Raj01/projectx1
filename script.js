const puzzleContainer = document.getElementById('puzzle-container');
const scoreElement = document.getElementById('score');
const messageElement = document.getElementById('message');

let score = 0;
let currentLetters = [];
let targetWord = '';
let draggedLetter = null;

const words = ['APPLE', 'GRAPE', 'LEMON', 'MANGO', 'PEACH'];
let currentWordIndex = 0;

// Initialize the game
function init() {
  targetWord = words[currentWordIndex];
  currentLetters = shuffle(targetWord.split(''));
  renderPuzzle();
  addSlideLetters();
}

// Render the puzzle letters
function renderPuzzle() {
  puzzleContainer.innerHTML = '';
  currentLetters.forEach((letter, index) => {
    const letterElement = document.createElement('div');
    letterElement.classList.add('letter');
    letterElement.textContent = letter;
    letterElement.draggable = true;
    letterElement.dataset.index = index;
    letterElement.addEventListener('dragstart', handleDragStart);
    letterElement.addEventListener('dragend', handleDragEnd);
    puzzleContainer.appendChild(letterElement);
  });
}

// Handle drag start
function handleDragStart(e) {
  draggedLetter = e.target;
  e.target.classList.add('dragging');
}

// Handle drag end
function handleDragEnd(e) {
  e.target.classList.remove('dragging');
}

// Handle arrow key movement
document.addEventListener('keydown', (e) => {
  if (!draggedLetter) return;

  const index = parseInt(draggedLetter.dataset.index);
  let newIndex = index;

  switch (e.key) {
    case 'ArrowLeft':
      newIndex = Math.max(index - 1, 0);
      break;
    case 'ArrowRight':
      newIndex = Math.min(index + 1, currentLetters.length - 1);
      break;
    case 'ArrowUp':
      newIndex = Math.max(index - 5, 0);
      break;
    case 'ArrowDown':
      newIndex = Math.min(index + 5, currentLetters.length - 1);
      break;
    case ' ':
      reverseLetters();
      return;
  }

  if (newIndex !== index) {
    swapLetters(index, newIndex);
    checkAnswer();
  }
});

// Swap letters
function swapLetters(index1, index2) {
  [currentLetters[index1], currentLetters[index2]] = [currentLetters[index2], currentLetters[index1]];
  renderPuzzle();
}

// Reverse letters
function reverseLetters() {
  currentLetters.reverse();
  renderPuzzle();
  checkAnswer();
}

// Check if the answer is correct
function checkAnswer() {
  const userWord = currentLetters.join('');
  if (userWord === targetWord) {
    score++;
    scoreElement.textContent = `Stars: ${score}`;
    messageElement.textContent = 'Correct! Next word...';
    setTimeout(() => {
      currentWordIndex = (currentWordIndex + 1) % words.length;
      init();
      messageElement.textContent = '';
    }, 1000);
  }
}

// Shuffle letters
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Add sliding letters for background
function addSlideLetters() {
  for (let i = 0; i < 20; i++) {
    const slideLetter = document.createElement('div');
    slideLetter.classList.add('slide-left');
    slideLetter.textContent = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    slideLetter.style.top = `${Math.random() * 100}vh`;
    slideLetter.style.left = `${Math.random() * 100}vw`;
    document.body.appendChild(slideLetter);
  }

  for (let i = 0; i < 20; i++) {
    const slideLetter = document.createElement('div');
    slideLetter.classList.add('slide-down');
    slideLetter.textContent = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    slideLetter.style.top = `${Math.random() * 100}vh`;
    slideLetter.style.left = `${Math.random() * 100}vw`;
    document.body.appendChild(slideLetter);
  }
}

// Start the game
init();
