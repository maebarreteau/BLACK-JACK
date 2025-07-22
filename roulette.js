let balance = 1000;
updateBalance();

function placeBet(type) {
  if (balance <= 0 || balance >= 2000) {
    alert("La partie est terminée. Rechargez la page pour rejouer.");
    return;
  }

  let betAmount = parseInt(prompt("Combien voulez-vous miser ?"), 10);
  if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
    alert("Mise invalide !");
    return;
  }

  let chosenNumber = null;
  if (type === 'number') {
    chosenNumber = parseInt(prompt("Sur quel numéro (0-36) ?"), 10);
    if (isNaN(chosenNumber) || chosenNumber < 0 || chosenNumber > 36) {
      alert("Numéro invalide !");
      return;
    }
  }

  spinRoulette(type, betAmount, chosenNumber);
}

function spinRoulette(betType, betAmount, chosenNumber) {
  const winningNumber = Math.floor(Math.random() * 37);
  const winningColor = getColor(winningNumber);

  const wheel = document.querySelector('.roulette-wheel');

  const randomSpins = 5;
  const anglePerNumber = 360 / 37;
  const stopAngle = 360 - (winningNumber * anglePerNumber);
  const totalRotation = (360 * randomSpins) + stopAngle;

  // Reset roue
  wheel.style.transition = 'none';
  wheel.style.transform = 'rotate(0deg)';

  setTimeout(() => {
    wheel.style.transition = 'transform 4s cubic-bezier(0.33, 1, 0.68, 1)';
    wheel.style.transform = `rotate(${totalRotation}deg)`;
  }, 20);

  document.getElementById('result').textContent = "La roue tourne...";

  setTimeout(() => {
    let win = false;
    let winnings = 0;

    if (betType === 'red' && winningColor === 'red') {
      win = true;
      winnings = betAmount * 2;
    } else if (betType === 'black' && winningColor === 'black') {
      win = true;
      winnings = betAmount * 2;
    } else if (betType === 'number' && winningNumber === chosenNumber) {
      win = true;
      winnings = betAmount * 36;
    }

    if (win) {
      balance += winnings;
      document.getElementById('message').textContent =
        `🎉 Gagné ! Numéro: ${winningNumber} (${winningColor}). Gain: +${winnings} €`;
    } else {
      balance -= betAmount;
      document.getElementById('message').textContent =
        `😢 Perdu ! Numéro: ${winningNumber} (${winningColor}). Perte: -${betAmount} €`;
    }

    updateBalance();
    document.getElementById('result').textContent = `Numéro tiré: ${winningNumber} (${winningColor})`;

    // Fin de partie si solde <= 0 ou >= 2000
    if (balance <= 0) {
      document.getElementById('message').textContent = "Vous êtes ruiné... et vous n'avez pas survécu à cette nuit.";
      disableBetButtons(true);
    } else if (balance >= 2000) {
      document.getElementById('message').textContent = "Félicitations, vous avez survécu.";
      disableBetButtons(true);
    }
  }, 4200);
}

function getColor(number) {
  if (number === 0) return 'green';
  const redNumbers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
  return redNumbers.includes(number) ? 'red' : 'black';
}

function updateBalance() {
  document.getElementById('balance').textContent = balance;
}

function disableBetButtons(disabled) {
  const buttons = document.querySelectorAll('.controls button');
  buttons.forEach(btn => btn.disabled = disabled);
}
