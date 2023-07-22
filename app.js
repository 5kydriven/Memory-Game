document.addEventListener("DOMContentLoaded", () => {
    const cardColors = ['blue', 'green', 'red', 'yellow', 'pink', 'black', 'orange', 'indigo','violet'];
    const cards = cardColors.concat(cardColors);
    let firstCard = null;
    let secondCard = null;
    let matchedPairs = 0;
  
    // Shuffle the cards
    shuffle(cards);
  
    const gameBoard = document.getElementById('gameBoard');
  
    // Create the cards on the game board
    cards.forEach((color) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('data-color', color);
      card.addEventListener('click', () => flipCard(card));
      gameBoard.appendChild(card);
    });
  
    function flipCard(card) {
      if (!firstCard) {
        firstCard = card;
        card.classList.add('flipped');
      } else if (firstCard === card) {
        // Clicked the same card twice, do nothing
        return;
      } else if (!secondCard) {
        secondCard = card;
        card.classList.add('flipped');
        checkForMatch();
      }
    }
  
    function checkForMatch() {
      const isMatch = firstCard.getAttribute('data-color') === secondCard.getAttribute('data-color');
      isMatch ? disableCards() : unflipCards();
    }
  
    function disableCards() {
      firstCard.removeEventListener('click', () => flipCard(firstCard));
      secondCard.removeEventListener('click', () => flipCard(secondCard));
      resetCards();
      matchedPairs++;
      if (matchedPairs === cardColors.length) {
        setTimeout(() => {
          alert('Congratulations! You matched all pairs. Restarting the game.');
          resetGame();
        }, 500);
      }
    }
  
    function unflipCards() {
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetCards();
      }, 1000);
    }
  
    function resetCards() {
      firstCard = null;
      secondCard = null;
    }
  
    function resetGame() {
      gameBoard.innerHTML = '';
      matchedPairs = 0;
      shuffle(cards);
      cards.forEach((color) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-color', color);
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
      });
    }
  
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  });
  