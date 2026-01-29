document.addEventListener('DOMContentLoaded', () => {
  let correctScore = 0;
  let incorrectScore = 0;

  const correctDisplay = document.getElementById('correct-count');
  const incorrectDisplay = document.getElementById('incorrect-count');

  const showButtons = document.querySelectorAll('.show-answer-btn');
  for (const button of showButtons) {
    button.addEventListener('click', (e) => {
      const btn = e.target;
      const container = btn.closest('.question-container');
      container.querySelector('.answer').classList.remove('hidden');
      btn.classList.add('hidden');
    });
  }

  const correctButtons = document.querySelectorAll('.correct-btn');
  for (const button of correctButtons) {
    button.addEventListener('click', (e) => {
      correctScore++;
      correctDisplay.textContent = correctScore;

      disableButtons(e.target);
    });
  }

  const incorrectButtons = document.querySelectorAll('.incorrect-btn');
  for (const button of incorrectButtons) {
    button.addEventListener('click', (e) => {
      incorrectScore++;
      incorrectDisplay.textContent = incorrectScore;

      disableButtons(e.target);
    });
  }

  function disableButtons(clickedBtn) {
    const container = clickedBtn.closest('.scoring');
    const buttons = container.querySelectorAll('button');
    for (const btn of buttons) {
      btn.disabled = true;
      btn.style.opacity = '0.5';
      btn.style.cursor = 'default';
    }
  }
});