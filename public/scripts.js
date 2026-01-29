document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.show-answer-btn');

  for (const button of buttons) {
    button.addEventListener('click', (e) => {
      const btn = e.target;
      
      const container = btn.closest('.question-container');
      
      const answerDiv = container.querySelector('.answer');

      answerDiv.classList.remove('hidden');

      btn.classList.add('hidden');
    });
  }
});