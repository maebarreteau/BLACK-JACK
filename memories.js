const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard = null;
let secondCard = null;

let erreurs = 0;
let score = 0;

function flipCard() {
  if (lockBoard) return; 
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
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
  lockBoard = true; 
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  score++;
  const scoreSpan = document.getElementById('score');
  if (scoreSpan) scoreSpan.textContent = score;

  if (score === 6) {
    const nextButton = document.getElementById('next-button');
    if (nextButton) nextButton.style.display = 'block';
  }

  setTimeout(() => {
    firstCard.classList.add('fade-out');
    secondCard.classList.add('fade-out');

    setTimeout(() => {
      firstCard.style.visibility = 'hidden';
      secondCard.style.visibility = 'hidden';
      resetBoard();
    }, 500);
  }, 300);
}

function unflipCards() {
  lockBoard = true; 
  erreurs++;
  const erreursSpan = document.getElementById('erreurs');
  if (erreursSpan) erreursSpan.textContent = erreurs;

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
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}


(function shuffle() {
  cards.forEach(card => {
    const randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
})();


cards.forEach(card => card.addEventListener('click', flipCard));
