const cards = document.querySelectorAll('.memory-card');

function shuffleCards() {
  cards.forEach(card => {
    const randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

// On mélange une première fois au chargement
shuffleCards();

cards.forEach(card => {
  card.addEventListener('click', () => {
    if (card.classList.contains('flip')) return;

    card.classList.add('flip');

    if (card.dataset.card === 'ace') {
      alert('Bravo, vous avez trouvé l\'As !');
      
    } else {
      alert('Désolée, vous êtes mort !');

      setTimeout(() => {
       
        cards.forEach(c => c.classList.remove('flip'));

      
        shuffleCards();
      }, 1500);
    }
  });
});

