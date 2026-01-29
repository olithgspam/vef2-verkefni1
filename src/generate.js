import { writeFile, mkdir } from 'node:fs/promises';
import { parseQuestions } from './lib/parse.js';
import { template } from './lib/html.js';

async function main() {
  console.log('Sæki spurningar...');
  const questions = await parseQuestions();

  const categories = new Set(questions.map((q) => q.category));
  const sortedCategories = Array.from(categories).sort();

  let categoryListHtml = '<ul>';
  for (const category of sortedCategories) {
    if (!category) continue;
    const filename = `${category}.html`;
    categoryListHtml += `<li><a href="${filename}">${category}</a></li>`;
  }
  categoryListHtml += '</ul>';

  const indexHtml = template('Spurningaleikurinn', `
    <h1>Velkomin í Spurningaleikinn</h1>
    <p>Veldu flokk til að byrja:</p>
    ${categoryListHtml}
  `);

  await mkdir('./dist', { recursive: true });
  await writeFile('./dist/index.html', indexHtml);

  for (const category of sortedCategories) {
    if (!category) continue;

    const categoryQuestions = questions.filter((q) => q.category === category);

    let questionsHtml = '<ul>';
    for (const q of categoryQuestions) {
      questionsHtml += `
        <li class="question-container">
          <h3>${q.question}</h3>
          <button class="show-answer-btn">Sýna svar</button>
          <div class="answer hidden">
            <p>Svar: <strong>${q.answer}</strong></p>
            <div class="scoring">
              <button class="correct-btn">Rétt</button>
              <button class="incorrect-btn">Rangt</button>
            </div>
          </div>
        </li>`;
    }
    questionsHtml += '</ul>';

    questionsHtml += '<p><a href="index.html">Til baka á forsíðu</a></p>';

    const scoreboardHtml = `
      <div class="scoreboard">
        <div class="score-box correct">
          <span class="score-label">Rétt:</span>
          <span id="correct-count">0</span>
        </div>
        <div class="score-box incorrect">
          <span class="score-label">Rangt:</span>
          <span id="incorrect-count">0</span>
        </div>
      </div>
    `;

    const html = template(category, `
      <h1>${category}</h1>
      ${scoreboardHtml}
      ${questionsHtml}
    `);

    await writeFile(`./dist/${category}.html`, html);
  }

  console.log('Búið! Opnaðu dist/index.html til að skoða.');
}

main().catch((error) => {
  console.error('Villa:', error);
});