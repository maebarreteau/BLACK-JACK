const cards = document.querySelectorAll('.memory-card');
const continueBtn = document.getElementById('continueBtn');

// Cache le bouton dès le départ
continueBtn.style.display = 'none';

cards.forEach(card => {
  card.addEventListener('click', () => {
    if (card.classList.contains('flip')) return;

    card.classList.add('flip');
    if (card.dataset.card === 'ace') {
      setTimeout(() => {
        alert('Bravo, vous avez trouvé l\'As !');
        continueBtn.style.display = 'inline-block';
      }, 500);
    } else {
      setTimeout(() => {
        alert('Désolé, vous êtes mort !');

        setTimeout(() => {
          cards.forEach(c => c.classList.remove('flip'));
          shuffleCards();
        }, 1000);
      }, 500);
    }
  });
});


function shuffleCards() {
  cards.forEach(card => {
    const randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

shuffleCards();
