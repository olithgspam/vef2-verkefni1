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

    const parts = cleanLine.split(';');
    
    if (parts.length < 3) continue;

    const question = parts[0].trim();
    const answer = parts[1].trim();
    const category = parts[2].trim();

    questions.push({
      question,
      answer,
      category,
    });
  }

  return questions;
}