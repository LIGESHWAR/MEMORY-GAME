const emojis = ['🍎', '🍌', '🍇', '🍊', '🍉', '🍒', '🥝', '🍍'];
let cards = [...emojis, ...emojis]; // total 16 cards
let flippedCards = [];

function startGame() {
  const board = document.getElementById('game-board');
  board.innerHTML = '';
  flippedCards = [];

  // Shuffle the cards
  const shuffled = cards.sort(() => Math.random() - 0.5);

  // Create card elements
  shuffled.forEach(emoji => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.emoji = emoji;
    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
  });
}

function flipCard(card) {
  if (
    card.classList.contains('flipped') ||
    card.classList.contains('matched') ||
    flippedCards.length === 2
  ) return;

  card.textContent = card.dataset.emoji;
  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [card1, card2] = flippedCards;

    if (card1.dataset.emoji === card2.dataset.emoji) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      flippedCards = [];

      // ✅ Check if all cards matched
      const matchedCards = document.querySelectorAll('.card.matched').length;
      if (matchedCards === cards.length) {
        setTimeout(() => {
          alert("🎉 YOU WON !");
        }, 300);
      }

    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '';
        card2.textContent = '';
        flippedCards = [];
      }, 800);
    }
  }
}

// Start the game on page load
startGame();
