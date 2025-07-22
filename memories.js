const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard = null;
let secondCard = null;

let erreurs = 0;
let score = 0;

function flipCard() {
  if (lockBoard) return;        // board verrouillé ? on bloque
  if (this === firstCard) return; // clic sur la même carte => ignore

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;             // verrouille board, pas de clic supplémentaire

  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  // Retirer écouteurs
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  score++;
  document.getElementById('score').textContent = score;

  setTimeout(() => {
    firstCard.classList.add('fade-out');
    secondCard.classList.add('fade-out');

    setTimeout(() => {
      firstCard.style.visibility = 'hidden';
      secondCard.style.visibility = 'hidden';
      resetBoard();
    }, 500);
  }, 500);
}

function unflipCards() {
  erreurs++;
  document.getElementById('erreurs').textContent = erreurs;

  if (erreurs > 10) {
    alert("Vous avez fait trop d'erreurs, vous êtes mort !");
    cards.forEach(card => card.removeEventListener('click', flipCard));
    resetBoard();
    return;
  }

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

(function shuffle() {
  cards.forEach(card => {
    const randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
