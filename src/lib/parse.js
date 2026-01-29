import { readFile } from 'node:fs/promises';

export async function parseQuestions() {
  let fileContent;
  
  try {
    fileContent = await readFile('./data/questions.csv', { encoding: 'utf-8' });
  } catch (e) {
    console.error('Villa við lestur á skrá:', e);
    return [];
  }

  const questions = [];
  const lines = fileContent.split('\n');
  const dataLines = lines.slice(1);

  for (const line of dataLines) {
    const cleanLine = line.trim();
    if (!cleanLine) continue;

    const parts = cleanLine.split(',');
    
    if (parts.length < 6) continue;

    const category = parts[1].trim();
    const question = parts[4].trim();
    const answer = parts[5].trim();

    questions.push({
      question,
      answer,
      category,
    });
  }

  return questions;
}