export const DATA = [
  { id: 'a', question: 'test' },
  { id: 'b', question: 'test2' },
];
export const POLLS = [{
  id: 'a',
  question: 'test',
  answers: [
    { answer: 'yes', votes: 1 },
    { answer: 'no', votes: 0 },
  ],
}, {
  id: 'b',
  question: 'test2',
  answers: [
    { answer: 'yes', votes: 1 },
    { answer: 'no', votes: 0 },
  ],
}];

const TIMEOUT = 0;

export function getPolls(callback, timeout) {
  setTimeout(() => callback(null, DATA), timeout || TIMEOUT);
}

export function getPollById(id, callback, timeout) {
  const idx = POLLS.map(d => d.id).indexOf(id);
  const d = POLLS[idx];
  setTimeout(() => callback(null, d), timeout || TIMEOUT);
}
