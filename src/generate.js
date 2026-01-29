import { parseQuestions } from './lib/parse.js';

async function main() {
  console.log('generating...');
  const questions = await parseQuestions();
  console.log('Fjöldi spurninga:', questions.length);
}

main().catch((error) => {
  console.error('error generating', error);
});